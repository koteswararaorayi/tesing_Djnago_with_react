import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Import BrowserRouter, Routes, and Route
import './scss/style.scss'
import ProtectedRoute from './components/ProtectedRoute'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<DefaultLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
