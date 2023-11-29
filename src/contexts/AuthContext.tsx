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

type AuthContext = {
  login: (credentials: TCredentials) => void
  logout: () => void
  isAuth: boolean
  loading?: boolean
}

type AuthState = {
  isAuth: boolean
  loading?: boolean
}

const authContext = createContext<AuthContext | null>(null)

const initialState = {
  isAuth: false,
  loading: true,
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: (credentials: TCredentials) => authHttp.signIn(credentials),
    onSuccess: async (data) => {
      if (data.status === 401) {
        setAuthState((prevState) => ({
          ...prevState,
          isAuth: false,
          loading: false,
        }))
        return await refreshTokenMutation()
      }

      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
        loading: false,
      }))
      localStorage.setItem('token', data.data.token)
      axiosInstance.defaults.headers.Authorization = `Bearer ${data.data.token}`
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
  })

  const login = async (credentials: TCredentials) => {
    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }))
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
    setAuthState((prevState) => ({
      ...prevState,
      loading: true,
    }))
    const token = localStorage.getItem('token')
    if (token) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
        loading: false,
      }))
    }
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
    }))
  }, [])

  const memoizedValue = useMemo(
    () => ({
      login,
      logout,
      isAuth: authState.isAuth,
      loading: authState.loading,
    }),
    [authState.isAuth]
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
