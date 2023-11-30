import { createColumnHelper } from '@tanstack/react-table'
import { Box, Button, MenuItem, styled, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, MouseEvent } from 'react'
import StyledMenu from '../../Menu'

const columnHelper = createColumnHelper<Patient>()

const MoreButton = ({ patientId }: { patientId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

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
        <MoreVertIcon />
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
        <MenuItem
          onClick={() => navigate(`/patients/${patientId}`)}
          disableRipple
        >
          Details
        </MenuItem>
      </StyledMenu>
    </Box>
  )
}

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const patientColumns = [
  columnHelper.display({
    id: 'id',
    header: 'Patient ID',
    footer: 'Patient ID',
    cell: (props) => (
      <StyledLink
        sx={{
          maxWidth: '100px',
        }}
        to={`/patients/${props.row.original.id}`}
      >
        <Typography
          sx={{
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {props.row.original.id}
        </Typography>
      </StyledLink>
    ),
  }),
  columnHelper.display({
    id: 'firstName',
    header: 'First Name',
    footer: 'First Name',
    cell: (props) => (
      <StyledLink to={`/patients/${props.row.original.id}`}>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {props.row.original.firstName}
        </Typography>
      </StyledLink>
    ),
  }),
  columnHelper.display({
    id: 'lastName',
    header: 'Last Name',
    footer: 'Last Name',
    cell: (props) => props.row.original.lastName,
  }),
  columnHelper.display({
    id: 'birthDate',
    header: 'Birth Date',
    footer: 'Birth Date',
    cell: (props) => props.row.original.birthDate,
  }),
  columnHelper.display({
    id: 'sex',
    header: 'Gender',
    footer: 'Gender',
    cell: (props) => props.row.original.sex,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    size: 20,
    footer: '',
    cell: (props) => <MoreButton patientId={props.row.original.id} />,
  }),
]

export default patientColumns
