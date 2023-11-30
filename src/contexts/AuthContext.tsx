import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useMutation } from '@tanstack/react-query'
import authHttp from '../services/fetcher/auth/authHttp'
import axiosInstance from '../services/fetcher/axiosInstance'
import { isAxiosError } from 'axios'

type AuthContext = {
  login: (credentials: TCredentials) => void
  logout: () => void
  isAuth: boolean
  loading?: boolean
  loginLoading?: boolean
  status?: number
}

type AuthState = {
  isAuth: boolean
  loading?: boolean
  status?: number
}

const authContext = createContext<AuthContext | null>(null)

const initialState = {
  isAuth: false,
  loading: true,
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: (credentials: TCredentials) => authHttp.signIn(credentials),
    onSuccess: async (data) => {
      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
        loading: false,
      }))
      localStorage.setItem('token', data.data.token)
      axiosInstance.defaults.headers.Authorization = `Bearer ${data.data.token}`
    },
    onError: (data) => {
      if (isAxiosError(data)) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuth: false,
          loading: false,
          status: data?.response?.status,
        }))
        localStorage.removeItem('token')
      }
    },
  })

  const { mutateAsync: refreshTokenMutation } = useMutation({
    mutationFn: () =>
      authHttp.refreshToken(localStorage.getItem('token') as string),
    onSuccess: (data) => {
      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
        loading: false,
      }))
      localStorage.setItem('token', data.data.token)
      axiosInstance.defaults.headers.Authorization = `Bearer ${data.data.token}`
    },
    onError: (data) => {
      if (isAxiosError(data) && data?.response?.status === 401) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuth: false,
          loading: false,
        }))
        localStorage.removeItem('token')
      }
    },
  })

  const login = async (credentials: TCredentials) => {
    await loginMutation(credentials)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthState((prevState) => ({
      ...prevState,
      isAuth: false,
    }))
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !authState.isAuth) {
      refreshTokenMutation().then(() => {
        setAuthState((prevState) => ({
          ...prevState,
          loading: false,
          isAuth: true,
        }))
      })
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }))
    }
  }, [])

  const memoizedValue = useMemo(
    () => ({
      login,
      logout,
      isAuth: authState.isAuth,
      loading: authState.loading,
      loginLoading: isPending,
      status: authState.status,
    }),
    [authState]
  )

  return (
    <authContext.Provider value={memoizedValue}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(authContext)
  if (context === null || !context) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}
