import { createColumnHelper } from '@tanstack/react-table'
import {
  alpha,
  Box,
  Button,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState, MouseEvent } from 'react'

const columnHelper = createColumnHelper<Patient>()

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

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
    size: 20,
    header: '',
    footer: '',
    cell: (props) => <MoreButton patientId={props.row.original.id} />,
  }),
]

export default patientColumns
