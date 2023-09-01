import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const dispatch = useDispatch()
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
    // Do something before request is sent
    const token = useSelector((state) => state.auth.accessToken)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('request interceptor')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    const originalRequest = response.config
    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = useSelector((state) => state.auth.refreshToken)
      return apiInstance
        .post('/auth/refresh-token', { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            dispatch(refreshToken(res.data.accessToken, refreshToken))
            console.log('Access token refreshed!')
            return apiInstance(originalRequest)
          }
        })
    }
    console.log('response interceptor')
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)
export default apiInstance
