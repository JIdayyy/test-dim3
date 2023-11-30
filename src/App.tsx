import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/main.routes'
import AuthenticatedRouteWrapper from './routes'
import { AuthContextProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomThemeProvider } from './contexts/ThemeProvider'

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <CustomThemeProvider>
        <AuthContextProvider>
          <Router>
            <AuthenticatedRouteWrapper>
              <MainRoutes />
            </AuthenticatedRouteWrapper>
          </Router>
        </AuthContextProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  )
}
