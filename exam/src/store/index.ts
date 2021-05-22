import { createStore } from 'vuex'
import { IJwtResponse } from '@/models/IJwtResponse'
import { ILoginInfo } from '@/models/ILoginInfo'
import { AccountService } from '@/services/account-service'
import { IRegisterInfo } from '@/models/IRegisterInfo'

export interface IState {
  token: string | null;
}

export const initialState: IState = {
  token: localStorage.getItem('token')
}

export default createStore({
  state: initialState,
  mutations: {
    logOut: (state: IState) => {
      state.token = null
      localStorage.removeItem('token')
    },
    logIn: (state: IState, jwtResponse: IJwtResponse) => {
      state.token = jwtResponse.token
      localStorage.setItem('token', jwtResponse.token);
    }
  },
  actions: {
    async logIn (context, login: ILoginInfo): Promise<void> {
      const response = await AccountService.login(login)
      if (response) {
        context.commit('logIn', response)
      }
    },
    async register (context, login: IRegisterInfo): Promise<void> {
      const response = await AccountService.register(login)
      if (response) {
        context.commit('logIn', response)
      }
    }

  },
  modules: {
  }
})
