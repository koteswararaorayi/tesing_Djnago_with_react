import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleRepeatPasswordChange = (event) => {
    const newValue = event.target.value
    setRepeatPassword(newValue)

    if (newValue !== formData.password) {
      setErrorMsg('Passwords do not match')
    } else {
      setErrorMsg('')
    }
  }

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', formData)
      console.log(response)

      if (response.status === 201) {
        navigate('/login')

        setformData({
          name: '',
          email: '',
          password: '',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="name"
                      autoComplete="username"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                    />
                  </CInputGroup>
                  <p
                    className="error-message"
                    style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
                  >
                    {errorMsg}
                  </p>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
