import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthRoutes from './auth.routes'
import { Box, CircularProgress } from '@mui/material'

export default function AuthenticatedRouteWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { isAuth, loading } = useAuth()

  if (loading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: ({ palette }) => palette.background.default,
        }}
      >
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
    )
  }

  if (!isAuth) {
    return <AuthRoutes />
  }

  return children
}
