/* eslint-disable @typescript-eslint/no-shadow */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
  Box,
} from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import usePagination from './hooks/usePagination'
import { AxiosResponse } from 'axios'

interface TableProps<T> {
  columns: ColumnDef<T, unknown>[]
  defaultPageSize?: number
  defaultPageIndex?: number
  fetchFn: ({
    page,
    pageSize,
  }: {
    page: number
    pageSize: number
  }) => Promise<AxiosResponse<Dim3ApiResult<T>>>
}

const TableBodySkeletton = ({
  number,
  columnsNumber,
}: {
  number: number
  columnsNumber: number
}) => {
  return (
    <>
      {Array.from(Array(number).keys()).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={index}>
          {Array.from(Array(columnsNumber).keys()).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default function TableComponent<T>({
  columns,
  defaultPageSize,
  defaultPageIndex,
  fetchFn,
}: TableProps<T>) {
  const { paginationState, handlePageChange, handlePageSizeChange } =
    usePagination({
      defaultPageSize,
      defaultPageIndex,
    })

  const { data, isLoading } = useQuery({
    queryKey: ['patients', paginationState.page, paginationState.pageSize],
    queryFn: () =>
      fetchFn({
        page: paginationState.page,
        pageSize: paginationState.pageSize,
      }),
    placeholderData: keepPreviousData,
  })

  const table = useReactTable({
    columns,
    data: data?.data.content || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    pageCount: data?.data.totalPages,
    enableFilters: true,
    manualPagination: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    debugTable: true,
  })

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800, height: 670 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    sx={{
                      position: 'relative',
                    }}
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `hover:bg-white  absolute touch cursor-col-resize right-0 top-0  w-[2px] h-full bg-gray-300 z-50`,
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {!isLoading ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableBodySkeletton
                number={paginationState.pageSize}
                columnsNumber={columns.length}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <TablePagination
          sx={{
            width: '100%',
          }}
          count={data?.data.totalElements || 0}
          page={paginationState.page}
          rowsPerPage={paginationState.pageSize}
          onRowsPerPageChange={async (event) => {
            handlePageSizeChange(+event.target.value)
          }}
          onPageChange={async (_, newPage) => {
            handlePageChange(newPage)
          }}
        />
      </Box>
    </Paper>
  )
}
