import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import MainLayout from '../components/Layouts/MainLayout'
import PatientsPage from '../pages/Patients'
import { lazy, Suspense } from 'react'

const LazyPatientsDetailsPage = lazy(() => import('../pages/PatientDetails'))

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
        element: (
          <Suspense>
            <LazyPatientsDetailsPage />
          </Suspense>
        ),
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
