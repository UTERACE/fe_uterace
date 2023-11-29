import store from '@/store/store'
import axios from 'axios'
const apiInstance = axios.create({
  baseURL: 'https://be-uterace.onrender.com/api',
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
    console.log('response interceptor')
    return response
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      console.log('Attempting token refresh...')
      error.config._retry = true
      const state = store.getState()
      const refreshToken = state.auth.refreshToken
      const data = {
        refreshToken: refreshToken,
      }
      const jsonString = JSON.stringify(data)
      return await apiInstance
        .post('/auth/refresh-token', jsonString)
        .then((res) => {
          if (res.status === 200) {
            store.dispatch({
              type: 'auth/login',
              payload: {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              },
            })
            console.log('Access token refreshed!')
            return apiInstance.request(error.config)
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
