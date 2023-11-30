import { Box, styled } from '@mui/material'

const ResizerItem = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  z-index: 50;
  cursor: col-resize;
  &:hover {
    width: 5px;
  }
`

export default function Resizer({
  onResize,
}: {
  onResize: () => (event: unknown) => void
}) {
  return <ResizerItem onMouseDown={onResize()} onTouchStart={onResize()} />
}
