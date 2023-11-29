import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthRoutes from './auth.routes'

export default function AuthenticatedRouteWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <AuthRoutes />
  }

  return children
}
