import { createSlice } from '@reduxjs/toolkit'
import { LoginSuccessAction } from '../../services/types/auth.type'
const initialState = {
  currentUser: {} || null,
  isFetching: false,
  accessToken: '',
  error: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state: typeof initialState) => {
      state.isFetching = true
    },
    loginSuccess: (state: typeof initialState, action: LoginSuccessAction) => {
      state.isFetching = false
      state.currentUser = action.payload.dataUser
      state.accessToken = action.payload.accessToken
      state.error = false
    },
    logOutStart: (state: typeof initialState) => {
      state.isFetching = true
    },
    loginFailed: (state: typeof initialState) => {
      state.isFetching = false
      state.error = true
    },
    logOutSuccess: (state: typeof initialState) => {
      state.isFetching = false
      state.currentUser = null
      state.accessToken = ''
      state.error = false
    },
    logOutFailed: (state: typeof initialState) => {
      state.isFetching = false
      state.error = true
    }
    // refreshToken: (state: typeof initialState, action: RefreshTokenAction) => {
    //   state.accessToken = action.payload.accessToken
    //   state.timeExpired = action.payload.timeExpired
    // }
  }
})

export const { loginStart, loginFailed, loginSuccess, logOutSuccess, logOutFailed, logOutStart } = authSlice.actions

export default authSlice.reducer
