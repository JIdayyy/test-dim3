import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Patient>()

export const patientColumns = [
  columnHelper.display({
    id: 'id',
    header: 'Patient ID',
    cell: (props) => props.row.original.id,
  }),
  columnHelper.display({
    id: 'firstName',
    header: 'Patient Name',
    cell: (props) => props.row.original.firstName,
  }),
  columnHelper.display({
    id: 'lastName',
    header: 'Patient Last Name',
    cell: (props) => props.row.original.lastName,
  }),
  columnHelper.display({
    id: 'birthDate',
    header: 'Patient Birth Date',
    cell: (props) => props.row.original.birthDate,
  }),
  columnHelper.display({
    id: 'sex',
    header: 'Gender',
    cell: (props) => props.row.original.sex,
  }),
]
