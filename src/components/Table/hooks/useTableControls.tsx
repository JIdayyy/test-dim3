import { useState } from 'react'

interface TableControlsState {
  page: number
  pageSize: number
  columnsState: TColumnState[]
}

type TColumnState = {
  name: string
  hidden: boolean
}

/**
 * Custom hook for managing pagination state.
 *
 * @param options - The options for pagination.
 * @param options.defaultPageSize - The default page size.
 * @param options.defaultPageIndex - The default page index.
 *
 * @returns - An object containing pagination state and functions to handle page and page size changes.
 */
const useTableControls = ({
  defaultPageSize = 10,
  defaultPageIndex = 0,
  defaultColumnsState,
}: {
  defaultPageSize?: number
  defaultPageIndex?: number
  defaultColumnsState: TColumnState[]
}) => {
  const [tableControls, setTableControl] = useState<TableControlsState>({
    page: defaultPageIndex,
    pageSize: defaultPageSize,
    columnsState: defaultColumnsState,
  })

  /**
   * Handles a change in the current page index.
   *
   * @param {number} page - The new page index.
   */
  const handlePageChange = (page: number) => {
    setTableControl({ ...tableControls, page })
  }

  /**
   * Handles a change in the current page size.
   *
   * @param {number} pageSize - The new page size.
   */
  const handlePageSizeChange = (pageSize: number) => {
    setTableControl({ ...tableControls, pageSize })
  }

  /**
   * Handles a change in the visibility state of a column.
   *
   * @param {string} column - The column key.
   * @param {boolean} visible - The new visibility state.
   */
  const handleColumnStateChange = (column: string, hidden: boolean) => {
    const newColumnsState = tableControls.columnsState.map((state) => {
      if (state.name === column) {
        return {
          ...state,
          hidden,
        }
      }

      return state
    })

    setTableControl({
      ...tableControls,
      columnsState: newColumnsState,
    })
  }

  return {
    tableControls,
    handlePageChange,
    handlePageSizeChange,
    handleColumnStateChange,
  }
}

export default useTableControls
