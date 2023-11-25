import { NavigateFunction } from 'react-router-dom'
import { AppDispatch } from '~/redux/store'

import { PATH_ADMIN, PATH_AUTH } from '~/routes/path'
import Service from '../services'
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess
} from '../redux/authentication/authSlice'

export const registerService = async (formData: object, navigate: NavigateFunction) => {
  try {
    const response = await Service.post(`auth/register`, formData)
    if (response) {
      navigate(PATH_AUTH.login)
    }
  } catch (error) {
    console.log(error)
  }
}
export const loginService = async (formData: object, dispatch: AppDispatch, navigate: NavigateFunction) => {
  dispatch(loginStart())
  try {
    const response = await Service.post(`auth/login`, formData)
    if (response) {
      dispatch(loginSuccess(response))
      navigate(PATH_ADMIN.dashboard)
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
      console.log(response)
    }
  } catch (error) {
    dispatch(loginFailed())
  }
}
export const logoutService = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
  dispatch(logOutStart())
  try {
    const response = await Service.post(`auth/logout`)
    if (response) {
      dispatch(logOutSuccess())
      navigate('/')
      localStorage.remove('accessToken', response.accessToken)
    }
  } catch (error) {
    dispatch(logOutFailed())
  }
}

export const refreshToken = async (data: object) => {
  try {
    const response = await Service.post(`auth/refreshToken`, data)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
