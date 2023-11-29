import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@mui/material'

export default function SignInPage() {
  const { login } = useAuth()

  return <Button onClick={login}>Sign In</Button>
}
