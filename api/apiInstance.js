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
    // Do something before request is sent
    const token = localStorage.getItem('accessToken')
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
      const refreshToken = localStorage.getItem('refreshToken')
      return apiInstance
        .post('/auth/refresh-token', { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.accessToken)
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
