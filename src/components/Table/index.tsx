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
  styled,
} from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import usePagination from './hooks/usePagination'
import { AxiosResponse } from 'axios'
import Resizer from './Resizer'
import TableBodySkeleton from './Skeletton'

interface TableProps<T> {
  columns: ColumnDef<T, unknown>[]
  defaultPageSize?: number
  defaultPageIndex?: number
  name: string
  fetchFn: ({
    page,
    pageSize,
  }: {
    page: number
    pageSize: number
  }) => Promise<AxiosResponse<Dim3ApiResult<T>>>
}

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  position: 'relative',
  color: '#000',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  '&:first-child': {
    paddingLeft: theme.spacing(3),
  },
  '&:last-child': {
    paddingRight: theme.spacing(3),
  },
}))

export default function PaginatedTableComponent<T>({
  columns,
  defaultPageSize,
  defaultPageIndex,
  fetchFn,
  name,
}: TableProps<T>) {
  const { paginationState, handlePageChange, handlePageSizeChange } =
    usePagination({
      defaultPageSize,
      defaultPageIndex,
    })

  const { data, isLoading } = useQuery({
    queryKey: [name, paginationState.page, paginationState.pageSize],
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
    debugTable: import.meta.env.NODE_ENV !== 'development',
  })

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        sx={{
          maxHeight: 800,
          height: 670,
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            position: 'absolute',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: (theme) => theme.palette.action.selected,
            borderRadius: 2,
          },
        }}
      >
        <Table stickyHeader>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    <Resizer onResize={header.getResizeHandler} />
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody
            sx={{
              minHeight: 600,
            }}
          >
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
              <TableBodySkeleton
                number={paginationState.pageSize}
                columnsNumber={columns.length}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* This is a little trick to make the pagination component sticky to bottom and avoid console warnings */}
      <Table>
        <TableBody>
          <TableRow>
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
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
