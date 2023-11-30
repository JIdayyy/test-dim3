import { Switch, Typography } from '@mui/material'
import { useThemeContext } from '../../contexts/ThemeProvider'

export default function ThemeSwitch() {
  const { toggleColorMode, theme } = useThemeContext()

  return (
    <>
      <Typography variant="body1" component="div">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </Typography>
      <Switch checked={theme !== 'light'} onChange={() => toggleColorMode()} />
    </>
  )
}
