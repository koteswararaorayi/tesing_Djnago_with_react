/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

function EducationDetails() {
  const [educationList, setEducationList] = useState([
    {
      schoolCollegeName: '',
      address: '',
      levelOfEducation: 'Post Graduation',
      courseName: '',
      grade: '',
      backlogs: false,
      numberOfBacklogs: '',
      durationFrom: '',
      durationTo: '',
    },
    {
      schoolCollegeName: '',
      address: '',
      levelOfEducation: 'Graduation',
      courseName: '',
      grade: '',
      backlogs: false,
      numberOfBacklogs: '',
      durationFrom: '',
      durationTo: '',
    },
    {
      schoolCollegeName: '',
      address: '',
      levelOfEducation: 'Inter/Diploma',
      courseName: '',
      grade: '',
      backlogs: false,
      numberOfBacklogs: '',
      durationFrom: '',
      durationTo: '',
    },
    {
      schoolCollegeName: '',
      address: '',
      levelOfEducation: 'SSC',
      courseName: '',
      grade: '',
      backlogs: false,
      numberOfBacklogs: '',
      durationFrom: '',
      durationTo: '',
    },
  ])

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target

    if (name === 'levelOfEducation') {
      // Clear fields in subsequent entries
      for (let i = index + 1; i < educationList.length; i++) {
        educationList[i].levelOfEducation = ''
      }
    }

    setEducationList((prevList) => {
      const updatedList = [...prevList]
      updatedList[index][name] = value
      return updatedList
    })
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target

    setEducationList((prevList) => {
      const updatedList = [...prevList]
      updatedList[index][name] = value
      return updatedList
    })
  }

  return (
    <div className="container mt-5">
      <h2>Education Details</h2>
      {educationList.map((education, index) => (
        <div key={index} className="mb-4">
          <div className="mb-3">
            <label>School/College Name</label>
            <input
              type="text"
              name="schoolCollegeName"
              value={education.schoolCollegeName}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={education.address}
              onChange={(e) => handleEducationChange(e, index)}
            />
          </div>
          <div className="mb-3">
            <label>Level of Education</label>
            <select
              name="levelOfEducation"
              value={education.levelOfEducation}
              onChange={(e) => handleChange(e, index)}
            >
              <option value="">Select...</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Graduation">Graduation</option>
              <option value="Inter/Diploma">Inter/Diploma</option>
              <option value="SSC">SSC</option>
            </select>
          </div>
          {/* Other fields */}
          {/* ... (other fields) */}
          <hr />
        </div>
      ))}
    </div>
  )
}

export default EducationDetails
