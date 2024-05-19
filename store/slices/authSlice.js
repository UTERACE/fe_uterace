import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  accessToken: null,
  refreshToken: null,
  image: null,
  firstname: null,
  lastname: null,
  roles: null,
  email: null,
  isAuthenticated: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken(state, action) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    login(state, action) {
      state.id = action.payload.id
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.image = action.payload.image
      state.email = action.payload.email
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.roles = action.payload.roles
      state.isAuthenticated = true
    },
    logout(state) {
      state.id = null
      state.accessToken = null
      state.refreshToken = null
      state.image = null
      state.email = null
      state.firstname = null
      state.lastname = null
      state.roles = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
