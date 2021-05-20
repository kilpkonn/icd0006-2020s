import { IJwtResponse } from '../types/IJwtResponse'
import axios, { AxiosResponse } from 'axios'
import { ILoginInfo } from '../types/ILoginInfo'
import { IRegisterInfo } from '../types/IRegisterInfo'

export class AccountService {
  static async login (loginInfo: ILoginInfo): Promise<IJwtResponse | null> {
    return await axios.post<IJwtResponse>('/api/v1/Account/Login',
      JSON.stringify(loginInfo),
      { headers: { 'Content-type': 'application/json' } }
    ).then(async (response: AxiosResponse<IJwtResponse>) => {
      if (response.status > 199 && response.status < 300) {
        return response.data
      }
      return null
    }).catch(err => {
      console.error(err)
      return null
    })
  }

  static async register (registerInfo: IRegisterInfo): Promise<IJwtResponse | null> {
    return await axios
      .post<IJwtResponse>('/api/v1/Account/Register', registerInfo,
        { headers: { 'Content-type': 'application/json' } }
      ).then(async (response: AxiosResponse<IJwtResponse>) => {
        if (response.status > 199 && response.status < 300) {
          return response.data
        }
        return null
      })
  }
}
