interface Patient {
  metadata: any
  id: string
  firstName: string
  lastName: string
  birthDate: string
  sex: string
  lastAdmissionId: string | null
  lastAdmissionStartDate: string | null
  lastAdmissionEndDate: string | null
  bed: string | null
  unit: string | null
  lastLabAnalysisDate: string | null
  areaName: string | null
  currentNotes: any[]
  reason: any
}

interface Dim3ApiResult<T> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: Sort2
  numberOfElements: number
  first: boolean
  empty: boolean
}

interface Metadata {}

interface Pageable {
  sort: Sort
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Sort2 {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
