import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import MainLayout from '../components/Layouts/MainLayout'
import PatientDetailsPage from '../pages/PatientDetails'
import PatientsPage from '../pages/Patients'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <PatientsPage />,
      },
      {
        path: '/patients/:id',
        element: <PatientDetailsPage />,
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
