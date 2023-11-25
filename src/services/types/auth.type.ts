export interface LoginType {
  email: string
  password: string
}
export interface TData {
  data: { status: boolean; data: object }
}
export interface CurrentUser {
  _id: string
  lastName: string
  firstName: string
  email: string
  role: string
  mobile: number
  createdAt: string
  updatedAt: string
}
export interface LoginSuccessPayload {
  dataUser: CurrentUser
  accessToken: string
}
export interface LoginSuccessAction {
  type: string
  payload: LoginSuccessPayload
}
export interface RefreshTokenAction {
  type: string
  payload: {
    accessToken: string
    timeExpired: number
  }
}
