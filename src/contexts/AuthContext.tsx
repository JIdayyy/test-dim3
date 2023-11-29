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
}

type AuthState = {
  isAuth: boolean
}

const authContext = createContext<AuthContext | null>(null)

const initialState = {
  isAuth: false,
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const { mutateAsync } = useMutation({
    mutationFn: (credentials: TCredentials) => authHttp.signIn(credentials),
    onSuccess: (data) => {
      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
      }))
      localStorage.setItem('token', data.data.token)
      axiosInstance.defaults.headers.Authorization = `Bearer ${data.data.token}`
    },
  })

  const login = async (credentials: TCredentials) => {
    await mutateAsync(credentials)
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
    if (token) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuth: true,
      }))
    }
  }, [])

  const memoizedValue = useMemo(
    () => ({ login, logout, isAuth: authState.isAuth }),
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
