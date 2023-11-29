import axiosInstance from '../axiosInstance'

const authHttp = {
  signIn: (credentials: TCredentials) =>
    axiosInstance.post<{
      token: string
    }>('/token-auth', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  refreshToken: (token: string) =>
    axiosInstance.post<{
      token: string
    }>(
      '/token-refresh',
      {
        token: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
}

export default authHttp
