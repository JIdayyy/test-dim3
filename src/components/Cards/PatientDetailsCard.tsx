import { Card, Skeleton, Stack, Typography } from '@mui/material'
import TextWithLabel from '../UI/TextWithLabel'

type PatientDetailsCardProps = {
  isLoading: boolean
  patient?: Patient
}

const PatientCardSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width="100%" height="20px" />
      <Skeleton variant="rectangular" width="100%" height="20px" />
    </Stack>
  )
}

export default function PatientDetailsCard({
  isLoading,
  patient,
}: PatientDetailsCardProps) {
  return (
    <Card
      sx={{
        padding: '1rem',
        width: '100%',
      }}
    >
      <Typography variant="h4">Patient Details</Typography>

      {!isLoading && patient && (
        <>
          <TextWithLabel label="FirstName" text={patient.firstName} />
          <TextWithLabel label="LastName" text={patient.lastName} />
          <TextWithLabel label="BirthDate" text={patient.birthDate} />
          <TextWithLabel label="Sex" text={patient.sex} />
        </>
      )}

      {!isLoading && !patient && <div>Patient not found</div>}

      {isLoading && <PatientCardSkeleton />}
    </Card>
  )
}
