import patientsHttp from '../services/fetcher/patients/patientsHttp'
import TableComponent from '../components/Table'
import { patientColumns } from '../components/Table/columns/patients'

export default function HomePage() {
  return (
    <>
      <TableComponent
        columns={patientColumns}
        fetchFn={patientsHttp.findMany}
        defaultPageSize={10}
        defaultPageIndex={0}
      />
    </>
  )
}
