import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
]

export default routes
