import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

function RootPathComponent() {
  const {
    appState: { isLoggedIn },
  } = useAppContext()

  const pathToNavigate = isLoggedIn ? '/pages/all-expenses' : '/login'

  return <Navigate to={pathToNavigate} />
}

export default RootPathComponent
