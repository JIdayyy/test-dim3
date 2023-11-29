import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/main.routes'
import AuthenticatedRouteWrapper from './routes'

export default function App() {
  return (
    <Router>
      <AuthenticatedRouteWrapper>
        <MainRoutes />
      </AuthenticatedRouteWrapper>
    </Router>
  )
}
