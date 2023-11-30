import { FieldErrors, FieldName, FieldValues } from 'react-hook-form'
import { Typography } from '@mui/material'
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message'

interface FormErrorProps<T extends FieldValues> {
  errors: FieldErrors<T>

  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>>
}
export default function FormError<T extends FieldValues>({
  errors,
  name,
}: FormErrorProps<T>) {
  return (
    <Typography
      sx={{
        color: 'red',
      }}
    >
      <ErrorMessage errors={errors} name={name} />
    </Typography>
  )
}
