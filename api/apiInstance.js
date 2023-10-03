import store from '@/store/store'
import axios from 'axios'
const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiInstance.interceptors.request.use(
  function (config) {
    const state = store.getState()
    const token = state.auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('request interceptor')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  function (response) {
    console.log('response', response)
    const originalRequest = response.config
    if (response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const state = store.getState()
      const refreshToken = state.auth.refreshToken
      return apiInstance
        .post('/auth/refresh-token', { refreshToken: refreshToken })
        .then((res) => {
          if (res.status == 200) {
            store.dispatch({
              type: 'REFRESH_TOKEN',
              accessToken: res.data.accessToken,
              refreshToken: refreshToken,
            })
            console.log('Access token refreshed!')
            return apiInstance(originalRequest)
          }
        })
    }
    console.log('response interceptor')
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default apiInstance
