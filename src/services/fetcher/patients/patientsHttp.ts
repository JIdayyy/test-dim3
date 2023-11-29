import axiosInstance from '../axiosInstance'

type PaginationParams = {
  page: number
  pageSize: number
}

const patientsHttp = {
  findMany: (pagination: PaginationParams) =>
    axiosInstance.get<Dim3ApiResult<Patient>>(
      `/patient-list?page=${pagination.page}&pageSize=${pagination.pageSize}`
    ),
  findOne: (id: string) => axiosInstance.get<Patient>(`/patients/${id}`),
}

export default patientsHttp
