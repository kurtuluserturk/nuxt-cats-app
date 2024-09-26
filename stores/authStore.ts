import { defineStore } from 'pinia'

interface AuthState {
  user: string | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),
  actions: {
    login(username: string, password: string) {
      return new Promise<void>((resolve, reject) => {
        if (username === 'user' && password === 'password') {
          this.user = username
          this.token = 'fake-jwt-token'
          resolve()
        } else {
          reject('Kullanıcı adı veya şifre yanlış.')
        }
      })
    },
    logout() {
      this.user = null
      this.token = null
    }
  },
  getters: {
    isAuthenticated: (state): boolean => !!state.token
  }
})