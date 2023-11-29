import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const buildHeaders = () => {
  const token = localStorage.getItem('token')
  const baseHeaders = {
    'Content-Type': 'application/json',
    Accept: '*/*',
  }

  if (token) {
    return {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  return baseHeaders
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: buildHeaders(),
})

export default axiosInstance
