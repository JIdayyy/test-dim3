import PaginatedTableComponent from '../components/Table'
import patientColumns from '../components/Table/columns/patients'
import patientsHttp from '../services/fetcher/patients/patientsHttp'
import Page from '../components/UI/Page'

export default function PatientsPage() {
  return (
    <Page center>
      <PaginatedTableComponent<Patient>
        columns={patientColumns}
        fetchFn={patientsHttp.findMany}
        defaultPageSize={10}
        name="patients"
        defaultPageIndex={0}
      />
    </Page>
  )
}
