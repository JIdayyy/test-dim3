import { createContext, ReactNode, useContext, useState } from 'react'

type AuthContext = {
  login: () => void
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
  const login = () => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuth: true,
    }))
  }

  const logout = () => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuth: false,
    }))
  }

  return (
    <authContext.Provider value={{ login, logout, isAuth: authState.isAuth }}>
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
