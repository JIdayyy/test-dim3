import { AppBar, Box, Button, Switch, Toolbar, Typography } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeContext } from '../../contexts/ThemeProvider'

export default function Navbar() {
  const { logout } = useAuth()
  const { toggleColorMode, theme } = useThemeContext()

  return (
    <AppBar position="static">
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
          <Typography variant="body1" component="div">
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
          </Typography>
          <Switch onChange={() => toggleColorMode()} />
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
