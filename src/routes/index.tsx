import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthRoutes from './auth.routes'
import { Box, CircularProgress, styled } from '@mui/material'

const LoadingContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.background.default};
`

export default function AuthenticatedRouteWrapper({
  children,
}: {
  children: ReactNode
}) {
  const { isAuth, loading } = useAuth()

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </LoadingContainer>
    )
  }

  if (!isAuth) {
    return <AuthRoutes />
  }

  return children
}
