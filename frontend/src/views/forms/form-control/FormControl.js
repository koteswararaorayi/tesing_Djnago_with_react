import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PersonalDetails from 'src/components/allForms/PersonalDetails'
import LanguageTest from 'src/components/allForms/LanguageTest'
import EducationDetails from 'src/components/allForms/EducationDetails'
import WorkExperience from 'src/components/allForms/WorkExperience'
import EmergencyContact from 'src/components/allForms/EmergencyContact'
import ParentsDetails from 'src/components/allForms/ParentsDetails'
import SiblingDetails from 'src/components/allForms/SiblingDetails'

const tabContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  margin: '10px 0',
}

const tabItemStyle = {
  backgroundColor: '#757575',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '10px 20px',
  cursor: 'pointer',
  color: 'white',
  borderRadius: '5px',
  margin: '10px',
}

const activeTabStyle = {
  backgroundColor: '#333',
}

const tabLabels = {
  one: 'Personal Details',
  two: 'Language Test',
  three: 'Education Details',
  four: 'Work Experience',
  five: 'Emergency Contact',
  six: 'Parents Details',
  seven: 'siblings Details',
  eight: 'Programs Interested',
  nine: 'Visa Refugers',
  ten: 'Canada Immigration Info',
  eleven: 'International Travel History',
  // Add more labels as needed
}

function Tab({ value, isActive, onClick }) {
  const label = tabLabels[value] || ''

  return (
    <div style={{ ...tabItemStyle, ...(isActive ? activeTabStyle : {}) }} onClick={onClick}>
      {label}
    </div>
  )
}

Tab.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

function TabContent({ activeTab }) {
  switch (activeTab) {
    case 'one':
      return (
        <div>
          <PersonalDetails />
        </div>
      )
    case 'two':
      return (
        <div>
          <LanguageTest />
        </div>
      )
    case 'three':
      return (
        <div>
          <EducationDetails />
        </div>
      )
    case 'four':
      return (
        <div>
          <WorkExperience />
        </div>
      )
    case 'five':
      return (
        <div>
          <EmergencyContact />
        </div>
      )
    case 'six':
      return (
        <div>
          <ParentsDetails />
        </div>
      )
    case 'seven':
      return (
        <div>
          <SiblingDetails />
        </div>
      )
    case 'eight':
      return (
        <div>
          <EducationDetails />
        </div>
      )
    case 'nine':
      return (
        <div>
          <EducationDetails />
        </div>
      )
    case 'ten':
      return (
        <div>
          <EducationDetails />
        </div>
      )
    case 'eleven':
      return (
        <div>
          <EducationDetails />
        </div>
      )
    // Add more cases here
    default:
      return null
  }
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
}

function ColorTabs() {
  const [activeTab, setActiveTab] = useState('one')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const tabRows = [
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'],
    // Add more rows here
  ]

  return (
    <div>
      {tabRows.map((row, rowIndex) => (
        <div key={rowIndex} style={tabContainerStyle}>
          {row.map((tabValue) => (
            <Tab
              key={tabValue}
              value={tabValue}
              isActive={activeTab === tabValue}
              onClick={() => handleTabChange(tabValue)}
            />
          ))}
        </div>
      ))}
      <TabContent activeTab={activeTab} />
    </div>
  )
}

export default ColorTabs
