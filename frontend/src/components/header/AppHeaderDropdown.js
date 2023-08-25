import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  // CCardFooter,
  CCardText,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  // CModalBody,
  // CModalFooter,
  // CModalHeader,
  // CModalTitle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const [visible, setVisible] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear session data on the server
    // Invalidate tokens
    // Clear local storage or cookies

    Cookie.remove('access_token') // Example: Clear the JWT token

    navigate('/login') // Redirect to login page
  }

  const logoutModal = (
    <>
      <CButton onClick={() => setVisible(!visible)}>Logout</CButton>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        style={{ borderRadius: '20px' }}
      >
        <CCard style={{ height: '10em', borderRadius: '10px' }}>
          <CCardBody className="d-flex justify-content-center align-items-center">
            <CCardText className="text-danger">Are you sure you want to logout?</CCardText>
          </CCardBody>

          <footer style={{ marginBottom: '10px' }}>
            <CContainer fluid className="d-flex justify-content-between ">
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => handleLogout()}>
                Logout
              </CButton>
            </CContainer>
          </footer>
        </CCard>
      </CModal>
    </>
  )

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} className="me-3" />
          {logoutModal}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
