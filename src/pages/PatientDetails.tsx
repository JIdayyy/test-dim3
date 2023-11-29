import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import patientsHttp from '../services/fetcher/patients/patientsHttp'
import { Box, Typography } from '@mui/material'

export default function PatientDetailsPage() {
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientsHttp.findOne(id as string),
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <Box>
      <Typography variant="h4">Patient Details</Typography>

      <Typography variant="body1">{data?.data.firstName}</Typography>
      <Typography variant="body1">{data?.data.lastName}</Typography>
      <Typography variant="body1">{data?.data.birthDate}</Typography>
      <Typography variant="body1">{data?.data.sex}</Typography>
    </Box>
  )
}
