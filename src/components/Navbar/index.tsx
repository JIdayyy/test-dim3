import { AppBar, Button, Drawer, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

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
      <Drawer anchor="left" open={isOpened} onClose={toggleDrawer}>
        <span>MENU</span>
        <Button type="button" onClick={logout}>
          Logout
        </Button>
      </Drawer>
    </>
  )
}
