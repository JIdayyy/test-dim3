import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import patientsHttp from '../services/fetcher/patients/patientsHttp'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import Page from '../components/UI/Page'
import { ArrowBackIosNew } from '@mui/icons-material'
import PatientDetailsCard from '../components/Cards/PatientDetailsCard'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { StyledLink } from '../components/Table/columns/patients'

const NavigationContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`

const NavigateBack = () => {
  const navigate = useNavigate()
  return (
    <Button variant="outlined" onClick={() => navigate(-1)}>
      <ArrowBackIosNew />
    </Button>
  )
}

const Header = ({
  firstName,
  lastName,
}: {
  firstName: string | undefined
  lastName: string | undefined
}) => {
  return (
    <NavigationContainer>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <StyledLink to="/">
          <Typography
            sx={{
              textDecoration: 'none',
              color: 'white',
            }}
            variant="h6"
          >
            Patients
          </Typography>
        </StyledLink>
        <ArrowForwardIosRoundedIcon
          fontSize="small"
          sx={{
            margin: '0 0.5rem',
          }}
        />
        {firstName && lastName && (
          <Typography variant="body1">
            {firstName} {lastName}
          </Typography>
        )}
      </Stack>
      <NavigateBack />
    </NavigationContainer>
  )
}

export default function PatientDetailsPage() {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientsHttp.findOne(id as string),
    retry: false,
  })

  return (
    <Page>
      <Header firstName={data?.data.firstName} lastName={data?.data.lastName} />
      <PatientDetailsCard isLoading={isLoading} patient={data?.data} />
    </Page>
  )
}
