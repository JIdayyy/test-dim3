import { useQuery } from '@tanstack/react-query'
import patientsHttp from '../services/fetcher/patients/patientsHttp'

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ['patients'],
    queryFn: () =>
      patientsHttp.findMany({
        page: 0,
        pageSize: 10,
      }),
  })

  return <div className="text-blue-600">HOME PAGE</div>
}
