import { useAuth } from '../../contexts/AuthContext'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import styledEmotion from '@emotion/styled'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormError from '../../components/UI/FormError'
import LoginBg from '../../assets/login_bg.webp'

const FormContainer = styledEmotion.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 2rem;
  z-index: 10;
`

const LeftPanelContainer = styled(Box)`
  width: 70vw;
  height: 100vh;
  z-index: 1;
  background: url(${LoginBg});
  background-size: cover;
  background-position: center;
  filter: blur(0px);
  opacity: 0.1;
`

const FlexContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => {
    return theme.palette.background.default
  }};
`

const schema = yup
  .object({
    username: yup.string().min(3).required(),
    password: yup.string().min(5).max(20).required(),
  })
  .required()

export default function SignInPage() {
  const { login } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{
    username: string
    password: string
  }>({
    resolver: yupResolver(schema),
  })

  return (
    <PageContainer>
      <LeftPanelContainer />

      <FlexContainer>
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
              Log In
            </Typography>

            <TextField
              size="medium"
              label="Email"
              {...register('username')}
              placeholder="Email"
            />
            <FormError name="username" errors={errors} />

            <TextField
              size="medium"
              label="Password"
              {...register('password')}
              placeholder="Password"
            />
            <FormError name="password" errors={errors} />

            <Button fullWidth variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </FormContainer>
      </FlexContainer>
    </PageContainer>
  )
}
