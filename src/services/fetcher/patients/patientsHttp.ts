import axiosInstance from '../axiosInstance'
import { Dim3ApiResult } from '../../../types/dim3-d'

type PaginationParams = {
  page: number
  pageSize: number
}

const patientsHttp = {
  findMany: (pagination: PaginationParams) =>
    axiosInstance.get<Dim3ApiResult<Patient>>(
      `/patient-list?page=${pagination.page}&pageSize=${pagination.pageSize}`
    ),
}

export default patientsHttp
