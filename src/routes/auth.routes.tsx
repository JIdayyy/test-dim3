import { RouteObject } from 'react-router-dom'

const authRoutes: RouteObject[] = [
  {
    path: '/',

    element: <div>LOGIN</div>,
  },
  {
    path: '/register',
    element: <div>register</div>,
  },
]
export default authRoutes
