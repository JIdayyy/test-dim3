import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import ThemeSwitch from './ThemeSwitch'

export default function Navbar() {
  const { logout } = useAuth()

  return (
    <AppBar
      sx={{
        zIndex: 10,
      }}
      position="static"
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Patient Management
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ThemeSwitch />
        </Box>

        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            marginLeft: '1rem',
          }}
          variant="outlined"
          onClick={logout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
