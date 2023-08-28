import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (event) => {
    setIsLoading(true)
    event.preventDefault()
    try {
      const response = await axios.post(' http://127.0.0.1:8000/api/token/', formData)

      const access_token = response.data.access
      console.log(response.data.access)
      Cookies.set('access_token', access_token, { expires: 1 })
      navigate('/')
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid email or password. Please try again.')
      } else {
        setErrorMsg('An error occurred. Please try again later.')
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {isLoading ? (
        <CContainer fluid className="d-flex justify-content-center align-items-center vh-100">
          <SyncLoader color="#366cd6" margin={4} size={30} />
        </CContainer>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleLogin}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={formData.password}
                          name="password"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  )
}

export default Login
