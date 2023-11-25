/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import store from '../redux/store'
import { BASE_URL } from './constant'
import { PATH_AUTH } from '~/routes/path'

class Service {
  instance
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 3 * 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // this.instance.interceptors.response
    this.instance.interceptors.request.use(async (config: any) => {
      if (config.url.indexOf(PATH_AUTH.login) >= 0 || config.url.indexOf('/refreshToken') >= 0) {
        return config
      }
      const accessToken = store.getState().auth.accessToken
      // const refreshToken = store.getState().auth.refreshToken
      // const timeExpired = store.getState().auth.timeExpired
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      // const now = new Date().getTime()
      // if (timeExpired <= now) {
      //   const response = await this.instance.post('/admin/auth/refreshToken', refreshToken)
      //   store.dispatch({
      //     type: REFRESH_TOKEN_SUCCESS,
      //     payload: {
      //       accessToken: response.data.result.accessToken,
      //       timeExpired: response.data.result.timeExpired
      //     }
      //   })
      // }
      return config
    })

    this.instance.interceptors.response.use((response) => {
      return response
    })
  }

  async get(url: string) {
    try {
      const response = await this.instance.get(url)
      return response.data
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   return error.response.data
      // }
      console.log(error)
    }
  }
  async post(url: string, data?: object) {
    try {
      const response = await this.instance.post(url, data)
      return response.data
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   return error.response.data
      // }
      console.log(error)
    }
  }

  async update(url: string, data: string) {
    try {
      const response = await this.instance.put(url, data)
      return response.data
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   return error.response.data
      // }
      console.log(error)
    }
  }

  async put(url: string, data: object) {
    try {
      const response = await this.instance.put(url, data)
      return response.data
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   return error.response.data
      // }
      console.log(error)
    }
  }

  async delete(url: string) {
    try {
      const response = await this.instance.delete(url)
      return response.data
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   return error.response.data
      // }
      console.log(error)
    }
  }
}

export default new Service()
