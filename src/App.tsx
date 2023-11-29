import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/main.routes'
import { ThemeProvider } from '@emotion/react'
import AuthenticatedRouteWrapper from './routes'
import theme from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthenticatedRouteWrapper>
          <MainRoutes />
        </AuthenticatedRouteWrapper>
      </Router>
    </ThemeProvider>
  )
}
