/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import PersonalDetails from 'src/components/allForms/PersonalDetails'
import LanguageTest from 'src/components/allForms/LanguageTest'
import EducationDetails from 'src/components/allForms/EducationDetails'
import WorkExperience from 'src/components/allForms/WorkExperience'
import EmergencyContact from 'src/components/allForms/EmergencyContact'
import ParentsDetails from 'src/components/allForms/ParentsDetails'
import SiblingDetails from 'src/components/allForms/SiblingDetails'
import VisaRefusals from 'src/components/allForms/VisaRefusals'
import TravelForm from 'src/components/allForms/InternationTravelHistory'
import ProgramsInterested from 'src/components/allForms/ProgramsInterested'
import CanadaBiometricsInfo from 'src/components/allForms/CanadaImmigrationInfo'

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
  nine: 'Visa Refusals',
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

function TabContent({ activeTab, onTabChange }) {
  switch (activeTab) {
    case 'one':
      return (
        <div>
          <PersonalDetails onTabChange={onTabChange} />
        </div>
      )
    case 'two':
      return (
        <div>
          <LanguageTest onTabChange={onTabChange} />
        </div>
      )
    case 'three':
      return (
        <div>
          <EducationDetails onTabChange={onTabChange} />
        </div>
      )
    case 'four':
      return (
        <div>
          <WorkExperience onTabChange={onTabChange} />
        </div>
      )
    case 'five':
      return (
        <div>
          <EmergencyContact onTabChange={onTabChange} />
        </div>
      )
    case 'six':
      return (
        <div>
          <ParentsDetails onTabChange={onTabChange} />
        </div>
      )
    case 'seven':
      return (
        <div>
          <SiblingDetails onTabChange={onTabChange} />
        </div>
      )
    case 'eight':
      return (
        <div>
          <ProgramsInterested onTabChange={onTabChange} />
        </div>
      )
    case 'nine':
      return (
        <div>
          <VisaRefusals onTabChange={onTabChange} />
        </div>
      )
    case 'ten':
      return (
        <div>
          <CanadaBiometricsInfo onTabChange={onTabChange} />
        </div>
      )
    case 'eleven':
      return (
        <div>
          <TravelForm onTabChange={onTabChange} />
        </div>
      )
    // Add more cases here
    default:
      return null
  }
}

TabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
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
      <TabContent activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default ColorTabs
