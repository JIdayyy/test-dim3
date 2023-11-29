import TableComponent from '../components/Table'
import { patientColumns } from '../components/Table/columns/patients'
import patientsHttp from '../services/fetcher/patients/patientsHttp'

export default function PatientsPage() {
  return (
    <>
      <TableComponent<Patient>
        columns={patientColumns}
        fetchFn={patientsHttp.findMany}
        defaultPageSize={10}
        defaultPageIndex={0}
      />
    </>
  )
}
