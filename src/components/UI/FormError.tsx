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
        fontSize: '0.75rem',
        width: '100%',
      }}
    >
      <ErrorMessage errors={errors} name={name} />
    </Typography>
  )
}
