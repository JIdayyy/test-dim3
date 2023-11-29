import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import patientsHttp from '../services/fetcher/patients/patientsHttp'
import { Box, Button, Card, Typography } from '@mui/material'
import Page from '../components/UI/Page'
import { ArrowBackIosNew } from '@mui/icons-material'

const TextWithLabel = ({ label, text }: { label: string; text: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
        }}
        variant="body1"
      >
        {label}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  )
}

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
  })

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Patient not found</div>

  return (
    <Page>
      <NavigateBack />

      <Card
        sx={{
          padding: '1rem',
          width: '100%',
        }}
      >
        <Typography variant="h4">Patient Details</Typography>
        <TextWithLabel label="FirstName" text={data?.data.firstName} />
        <TextWithLabel label="LastName" text={data?.data.lastName} />
        <TextWithLabel label="BirthDate" text={data?.data.birthDate} />
        <TextWithLabel label="Sex" text={data?.data.sex} />
      </Card>
    </Page>
  )
}
