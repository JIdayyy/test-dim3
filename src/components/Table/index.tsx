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
import { AxiosResponse } from 'axios'
import Resizer from './Resizer'
import TableBodySkeleton from './Skeletton'
import useTableControls from './hooks/useTableControls'
import ColumnSelectionButton from './ColumnVisibility'
import { useEffect } from 'react'

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
  color: theme.palette.mode === 'light' ? '#fff' : '#000',
  fontWeight: 'bold',
  backgroundColor: theme.palette.secondary.main,
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
  const {
    tableControls,
    handlePageChange,
    handlePageSizeChange,
    handleColumnStateChange,
  } = useTableControls({
    defaultPageSize,
    defaultPageIndex,
    defaultColumnsState: columns.map((column) => ({
      name: column.id as string,
      hidden: false,
    })),
  })

  const { data, isLoading } = useQuery({
    queryKey: [name, tableControls.page, tableControls.pageSize],
    queryFn: () =>
      fetchFn({
        page: tableControls.page,
        pageSize: tableControls.pageSize,
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

  useEffect(() => {
    table.setColumnVisibility(
      tableControls.columnsState.reduce(
        (acc, state) => ({
          ...acc,
          [state.name]: !state.hidden,
        }),
        {}
      )
    )
  }, [tableControls.columnsState])

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
                number={tableControls.pageSize}
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
            <ColumnSelectionButton
              handleColumnsVisibility={(column, hidden) => {
                handleColumnStateChange(column, hidden)
              }}
              columnsState={tableControls.columnsState}
              columns={
                columns.map((column) => column.id as string) || ['No columns']
              }
            />
            <TablePagination
              sx={{
                width: '100%',
              }}
              count={data?.data.totalElements || 0}
              page={tableControls.page}
              rowsPerPage={tableControls.pageSize}
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
