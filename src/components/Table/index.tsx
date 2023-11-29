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
  TableFooter,
  Paper,
  TablePagination,
  Skeleton,
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
  columnsNumer,
}: {
  number: number
  columnsNumer: number
}) => {
  return (
    <>
      {Array.from(Array(number).keys()).map((_, index) => (
        <TableRow key={index}>
          {Array.from(Array(columnsNumer).keys()).map((_, index) => (
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

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['patients'],
    queryFn: () =>
      fetchFn({
        page: paginationState.page,
        pageSize: paginationState.pageSize,
      }),
    placeholderData: keepPreviousData,
  })

  const table = useReactTable({
    columns: columns,
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
    <TableContainer component={Paper}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableBodySkeletton number={10} columnsNumer={columns.length} />
          )}
          {/* ... (empty rows) */}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      <TablePagination
        count={data?.data.totalElements || 0}
        page={paginationState.page}
        rowsPerPage={paginationState.pageSize}
        onRowsPerPageChange={async (event) => {
          handlePageSizeChange(+event.target.value)
          await refetch()
        }}
        onPageChange={async (_, newPage) => {
          handlePageChange(newPage)
          await refetch()
        }}
      />
    </TableContainer>
  )
}
