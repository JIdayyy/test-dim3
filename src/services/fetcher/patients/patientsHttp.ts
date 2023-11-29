import axiosInstance from '../axiosInstance'

type PaginationParams = {
  page: number
  pageSize: number
}

const patientsHttp = {
  findMany: (pagination: PaginationParams) =>
    axiosInstance.get(
      `/patient-list?page=${pagination.page}&pageSize=${pagination.pageSize}`
    ),
}

export default patientsHttp
