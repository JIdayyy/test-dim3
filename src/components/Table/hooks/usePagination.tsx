import { useState } from 'react'

const usePagination = ({
  defaultPageSize = 10,
  defaultPageIndex = 0,
}: {
  defaultPageSize?: number
  defaultPageIndex?: number
}) => {
  const [paginationState, setPaginationState] = useState({
    page: defaultPageIndex,
    pageSize: defaultPageSize,
  })

  const handlePageChange = (page: number) => {
    setPaginationState({ ...paginationState, page })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPaginationState({ ...paginationState, pageSize })
  }

  return {
    paginationState,
    handlePageChange,
    handlePageSizeChange,
  }
}

export default usePagination
