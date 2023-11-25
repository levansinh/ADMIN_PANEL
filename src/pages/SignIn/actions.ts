import { LOGIN_SUCCESS } from './constants'
import { LoginSuccessAction, LoginSuccessPayload } from '../../services/types/auth.type'

export const loginSuccess = (data: LoginSuccessPayload): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data
})
