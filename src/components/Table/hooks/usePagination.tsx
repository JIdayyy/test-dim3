import { useState } from 'react'

/**
 * Custom hook for managing pagination state.
 *
 * @param options - The options for pagination.
 * @param options.defaultPageSize - The default page size.
 * @param options.defaultPageIndex - The default page index.
 *
 * @returns - An object containing pagination state and functions to handle page and page size changes.
 */
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

  /**
   * Handles a change in the current page index.
   *
   * @param {number} page - The new page index.
   */
  const handlePageChange = (page: number) => {
    setPaginationState({ ...paginationState, page })
  }

  /**
   * Handles a change in the current page size.
   *
   * @param {number} pageSize - The new page size.
   */
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
