import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import { Box } from '@mui/material'

export default function MainLayout() {
  return (
    <Box
      sx={{
        backgroundColor: ({ palette }) => palette.background.default,
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  )
}
