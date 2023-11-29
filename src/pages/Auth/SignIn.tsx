import { useAuth } from '../../contexts/AuthContext'
import { Box, Button, Input } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function SignInPage() {
  const { login } = useAuth()
  const { handleSubmit, register } = useForm<{
    username: string
    password: string
  }>()

  return (
    <Box>
      <form onSubmit={handleSubmit(login)}>
        <Input {...register('username')} placeholder="Email" />
        <Input {...register('password')} placeholder="Password" />

        <Button type="submit">Login</Button>
      </form>
    </Box>
  )
}
