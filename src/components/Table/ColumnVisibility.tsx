import { MouseEvent, useState } from 'react'
import { Box, Button, Switch, Typography } from '@mui/material'
import ViewColumnIcon from '@mui/icons-material/ViewColumn'
import StyledMenu from '../Menu'

const ColumnSelectionButton = ({
  columnsState,
  columns,
  handleColumnsVisibility,
}: {
  columns: string[]
  columnsState: {
    name: string
    hidden: boolean
  }[]
  handleColumnsVisibility: (column: string, hidden: boolean) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <Button onClick={handleClick} disableElevation>
        <ViewColumnIcon />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        open={open}
        onClose={handleClose}
      >
        {columns.map((column) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingX: 2,
            }}
          >
            <Typography>{column}</Typography>
            <Switch
              checked={
                !columnsState.find((state) => state.name === column)?.hidden ||
                false
              }
              onChange={
                handleColumnsVisibility
                  ? () => {
                      handleColumnsVisibility(
                        column,
                        !columnsState.find((state) => state.name === column)
                          ?.hidden
                      )
                    }
                  : undefined
              }
            />
          </Box>
        ))}
      </StyledMenu>
    </Box>
  )
}

export default ColumnSelectionButton
