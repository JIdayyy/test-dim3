import axiosInstance from '../axiosInstance'

const authHttp = {
  signIn: (credentials: TCredentials) =>
    axiosInstance.post<{
      token: string
    }>('/token-auth', credentials),
}

export default authHttp
