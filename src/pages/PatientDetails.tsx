import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import patientsHttp from '../services/fetcher/patients/patientsHttp'
import { Box, Button } from '@mui/material'
import Page from '../components/UI/Page'
import { ArrowBackIosNew } from '@mui/icons-material'
import PatientDetailsCard from '../components/Cards/PatientDetailsCard'

const NavigateBack = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Button
        sx={{
          marginBottom: '1rem',
        }}
        variant="outlined"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNew />
      </Button>
    </Box>
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
      <NavigateBack />
      <PatientDetailsCard isLoading={isLoading} patient={data?.data} />
    </Page>
  )
}
