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
    console.log('response interceptor')
    console.log('response', response)
    return response
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error._retry = true
      const state = store.getState()
      const refreshToken = state.auth.refreshToken
      return await apiInstance
        .post('/auth/refresh-token', { refreshToken: refreshToken })
        .then((res) => {
          if (res.status == 200) {
            store.dispatch({
              type: 'auth/login',
              payload: {
                accessToken: res.data.accessToken,
                refreshToken: refreshToken,
              },
            })
            console.log('Access token refreshed!')
            return apiInstance(originalRequest)
          }
        })
        .catch((err) => {
          console.log('Refresh token failed!')
          store.dispatch({
            type: 'auth/logout',
          })
          return Promise.reject(error)
        })
    }
    return Promise.reject(error)
  }
)

export default apiInstance
