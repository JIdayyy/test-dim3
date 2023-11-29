import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import HomePage from '../pages/Home'
import MainLayout from '../components/Layouts/MainLayout'
import AboutPage from '../pages/About'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]

const MainRoutes = () => useRoutes(routes)
export default MainRoutes
