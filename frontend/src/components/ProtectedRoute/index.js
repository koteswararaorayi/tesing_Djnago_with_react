import { Outlet, Navigate } from 'react-router-dom' // Import Navigate
import Cookie from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookie.get('access_token') !== undefined
  // eslint-disable-next-line react/react-in-jsx-scope
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
