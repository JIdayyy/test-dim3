import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/main.routes'
import { ThemeProvider } from '@emotion/react'
import AuthenticatedRouteWrapper from './routes'
import theme from './theme'
import { AuthContextProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Router>
            <AuthenticatedRouteWrapper>
              <MainRoutes />
            </AuthenticatedRouteWrapper>
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
