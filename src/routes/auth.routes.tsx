import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import SignInPage from '../pages/Auth/SignIn'

const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/register',
    element: <div>register</div>,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]

const AuthRoutes = () => useRoutes(authRoutes)

export default AuthRoutes
