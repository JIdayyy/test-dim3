import { createColumnHelper } from '@tanstack/react-table'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const columnHelper = createColumnHelper<Patient>()

const patientColumns = [
  columnHelper.display({
    id: 'id',
    header: 'Patient ID',
    footer: 'Patient ID',
    cell: (props) => (
      <Link to={`/patients/${props.row.original.id}`}>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.row.original.id}
        </Typography>
      </Link>
    ),
  }),
  columnHelper.display({
    id: 'firstName',
    header: 'First Name',
    footer: 'First Name',
    cell: (props) => (
      <Link to={`/patients/${props.row.original.id}`}>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.row.original.firstName}
        </Typography>
      </Link>
    ),
  }),
  columnHelper.display({
    id: 'lastName',
    header: 'Last Name',
    footer: 'Last Name',
    cell: (props) => props.row.original.lastName,
  }),
  columnHelper.display({
    id: 'birthDate',
    header: 'Birth Date',
    footer: 'Birth Date',
    cell: (props) => props.row.original.birthDate,
  }),
  columnHelper.display({
    id: 'sex',
    header: 'Gender',
    footer: 'Gender',
    cell: (props) => props.row.original.sex,
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    footer: '',
    cell: (props) => (
      <Box>
        <Link to={`/patients/${props.row.original.id}`}>Details</Link>
      </Box>
    ),
  }),
]

export default patientColumns
