import { Skeleton, TableCell, TableRow } from '@mui/material'

const TableBodySkeleton = ({
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
          {Array.from(Array(columnsNumber).keys()).map((__, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={i}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default TableBodySkeleton
