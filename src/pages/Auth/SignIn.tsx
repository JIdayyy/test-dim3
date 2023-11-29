import { useAuth } from '../../contexts/AuthContext'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 2rem;
`

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }: any) => {
    return theme.palette.background.default
  }};
`

export default function SignInPage() {
  const { login } = useAuth()
  const { handleSubmit, register } = useForm<{
    username: string
    password: string
  }>()

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(login)}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1rem',
              color: ({ palette }) => palette.primary.main,
            }}
            variant="body1"
          >
            Login
          </Typography>

          <TextField
            size="medium"
            label={'Email'}
            {...register('username')}
            placeholder="Email"
          />
          <TextField
            size="medium"
            label={'Password'}
            {...register('password')}
            placeholder="Password"
          />
          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </FormContainer>
    </PageContainer>
  )
}
