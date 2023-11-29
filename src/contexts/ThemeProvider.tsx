import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'

type TThemeContext = {
  toggleColorMode: () => void
  theme: 'light' | 'dark'
}

const themeContext = createContext<TThemeContext | null>(null)

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('dark')
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        )
      },
      mode,
    }),
    [mode]
  )

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <themeContext.Provider
      value={{
        toggleColorMode: colorMode.toggleColorMode,
        theme: colorMode.mode,
      }}
    >
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </themeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(themeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
