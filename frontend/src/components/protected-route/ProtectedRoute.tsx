import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

interface ProtectedRouteIProps {
  children: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteIProps> = ({ children }) => {
  const {
    appState: { isLoggedIn },
  } = useAppContext()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
