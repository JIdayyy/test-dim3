import { AppBar, Button, Drawer, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { logout } = useAuth()
  const [isOpened, setIsOpened] = useState(false)

  const toggleDrawer = () => {
    setIsOpened((state) => !state)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
        anchor="left"
        open={isOpened}
        onClose={toggleDrawer}
      >
        <span>MENU</span>
        <Link to={'/'}>Home</Link>
        <Link to={'/patients'}>Patients</Link>

        <Button type="button" onClick={logout}>
          Logout
        </Button>
      </Drawer>
    </>
  )
}
