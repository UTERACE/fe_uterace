import { API_HEADERS, API_TIMEOUT, API_URL } from '@/config/constants'
import store from '@/store/store'
import axios from 'axios'
const apiInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
})

const refreshTokenInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: API_HEADERS,
})

apiInstance.interceptors.request.use(
  function (config) {
    const state = store.getState()
    const token = state.auth.accessToken
    if (token != null && token != '' && token != undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry &&
      error.response.data.message === 'JWT token is expired'
    ) {
      error.config._retry = true
      const state = store.getState()
      const refreshToken = state.auth.refreshToken
      const data = {
        refreshToken: refreshToken,
      }
      const jsonString = JSON.stringify(data)
      return await refreshTokenInstance
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
            return apiInstance.request(error.config)
          }
        })
        .catch((err) => {
          store.dispatch({
            type: 'auth/logout',
          })
          return Promise.reject(err)
        })
    }
    return Promise.reject(error)
  }
)

export default apiInstance
