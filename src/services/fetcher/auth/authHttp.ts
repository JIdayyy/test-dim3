import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const authHttp = {
  signIn: (credentials: TCredentials) =>
    axios.post<{
      token: string
    }>(`${BASE_URL}/token-auth`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  refreshToken: (token: string) =>
    axios.post<{
      token: string
    }>(
      `${BASE_URL}/token-refresh`,
      {
        token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
}

export default authHttp
