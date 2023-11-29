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
}

export default authHttp
