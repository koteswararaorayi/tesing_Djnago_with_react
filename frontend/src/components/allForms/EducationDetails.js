import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import axios from 'axios'

function EducationForm({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [formData, setFormData] = useState({
    educationLevel: '',
  })

  const [postGraduationData, setPostGraduationData] = useState({
    educationLevel: 'Post Graduation',
    id: null,
    institutionName: '',
    address: '',
    courseName: '',
    gradePercentage: '',
    hasBacklogs: false,
    numberOfBacklogs: 0,
    durationStart: '',
    durationEnd: '',
  })

  const [graduationData, setGraduationData] = useState({
    educationLevel: 'Graduation',
    id: null,
    institutionName: '',
    address: '',
    courseName: '',
    gradePercentage: '',
    hasBacklogs: false,
    numberOfBacklogs: 0,
    durationStart: '',
    durationEnd: '',
  })

  const [interOrDiplomaData, setInterOrDiplomaData] = useState({
    educationLevel: 'Inter or Diploma',
    id: '',
    institutionName: '',
    address: '',
    courseName: '',
    gradePercentage: '',
    hasBacklogs: false,
    numberOfBacklogs: 0,
    durationStart: '',
    durationEnd: '',
  })

  const [sscData, setSscData] = useState({
    educationLevel: 'SSC',
    id: '',
    institutionName: '',
    address: '',
    courseName: '',
    gradePercentage: '',
    hasBacklogs: false,
    numberOfBacklogs: 0,
    durationStart: '',
    durationEnd: '',
  })
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/educationaldetails/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        var { data } = response.data

        setDataLength(data.length)
        const educationData = {}

        // Loop through the data and populate the educationData object
        data.forEach((item) => {
          educationData[item.education_level] = item
          console.log(item)
        })

        setPostGraduationData()
        // {
        //   educationLevel: 'Post Graduation',
        //   id: educationData['Post Graduation'].id,
        //   institutionName: educationData['Post Graduation'].institution_name,
        //   address: educationData['Post Graduation'].address,
        //   courseName: educationData['Post Graduation'].course_name,
        //   gradePercentage: educationData['Post Graduation'].grade_percentage,
        //   hasBacklogs: educationData['Post Graduation'].number_of_backlogs,
        //   numberOfBacklogs: educationData['Post Graduation'].number_of_backlogs,
        //   durationStart: educationData['Post Graduation'].duration_start,
        //   durationEnd: educationData['Post Graduation'].duration_end,
        // } || {
        //   educationLevel: 'Post Graduation',
        //   id: null,
        //   institutionName: '',
        //   address: '',
        //   courseName: '',
        //   gradePercentage: '',
        //   hasBacklogs: false,
        //   numberOfBacklogs: 0,
        //   durationStart: '',
        //   durationEnd: '',
        // },

        setGraduationData({
          educationLevel: 'Graduation',
          id: educationData['Graduation'].id || null,
          institutionName: educationData['Graduation'].institution_name || '',
          address: educationData['Graduation'].address || '',
          courseName: educationData['Graduation'].course_name || '',
          gradePercentage: educationData['Graduation'].grade_percentage || '',
          hasBacklogs: educationData['Graduation'].number_of_backlogs || '',
          numberOfBacklogs: educationData['Graduation'].number_of_backlogs || '',
          durationStart: educationData['Graduation'].duration_start || '',
          durationEnd: educationData['Graduation'].duration_end || '',
        })

        setInterOrDiplomaData({
          educationLevel: 'Inter or Diploma',
          id: educationData['Inter or Diploma'].id || '',
          institutionName: educationData['Inter or Diploma'].institution_name || '',
          address: educationData['Inter or Diploma'].address || '',
          courseName: educationData['Inter or Diploma'].course_name || '',
          gradePercentage: educationData['Inter or Diploma'].grade_percentage || '',
          hasBacklogs: educationData['Inter or Diploma'].number_of_backlogs || '',
          numberOfBacklogs: educationData['Inter or Diploma'].number_of_backlogs || '',
          durationStart: educationData['Inter or Diploma'].duration_start || '',
          durationEnd: educationData['Inter or Diploma'].duration_end || '',
        })

        setSscData({
          educationLevel: 'SSC',
          id: educationData['SSC'].id || '',
          institutionName: educationData['SSC'].institution_name || '',
          address: educationData['SSC'].address || '',
          courseName: educationData['SSC'].course_name || '',
          gradePercentage: educationData['SSC'].grade_percentage || '',
          hasBacklogs: educationData['SSC'].number_of_backlogs || '',
          numberOfBacklogs: educationData['SSC'].number_of_backlogs || '',
          durationStart: educationData['SSC'].duration_start || '',
          durationEnd: educationData['SSC'].duration_end || '',
        })

        if (educationData['Post Graduation']) {
          handleEducationLevelChange({ target: { value: 'Post Graduation' } })
        } else if (educationData['Graduation']) {
          handleEducationLevelChange({ target: { value: 'Graduation' } })
        } else if (educationData['Inter or Diploma']) {
          handleEducationLevelChange({ target: { value: 'Inter or Diploma' } })
        } else if (educationData['SSC']) {
          handleEducationLevelChange({ target: { value: 'SSC' } })
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEducationLevelChange = (e) => {
    const selectedEducationLevel = e.target.value
    console.log(selectedEducationLevel)
    setFormData({
      educationLevel: selectedEducationLevel,
    })
  }

  const handleChange = (e, educationLevel) => {
    const { name, value, type, checked } = e.target
    switch (educationLevel) {
      case 'Post Graduation':
        setPostGraduationData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }))
        break
      case 'Graduation':
        setGraduationData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }))
        break
      case 'Inter or Diploma':
        setInterOrDiplomaData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }))
        break
      case 'SSC':
        setSscData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }))
        break
      default:
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({
      postGraduationData,
      graduationData,
      interOrDiplomaData,
      sscData,
    })
    const testDetails = {
      postGraduationData,
      graduationData,
      interOrDiplomaData,
      sscData,
    }
    // You can now send each set of data to the API as needed
    try {
      const token = Cookie.get('access_token')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      if (dataLength > 0) {
        const response = await axios.put('http://127.0.0.1:8000/educationaldetails', testDetails, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('four')
        }
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/educationaldetails/',
          testDetails,
          { headers: headers },
        )

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('four')
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const renderEducationLevelForm = (label, educationLevel, data) => {
    return (
      <div className="education-box">
        <h3 className="mb-3 text-primary">{label}</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-educationLevel`}>Education Level:</label>
              <input
                type="text"
                id={`${educationLevel}-educationLevel`}
                name="educationLevel"
                className="form-control"
                value={educationLevel} // Display the education level for this form
                readOnly // Make it read-only to display
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-institutionName`}>Institution Name:</label>
              <input
                type="text"
                id={`${educationLevel}-institutionName`}
                name="institutionName"
                className="form-control"
                value={data.institutionName}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
        </div>
        {/* Add more fields here */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-address`}>Address:</label>
              <input
                type="text"
                id={`${educationLevel}-address`}
                name="address"
                className="form-control"
                value={data.address}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-courseName`}>Course Name:</label>
              <input
                type="text"
                id={`${educationLevel}-courseName`}
                name="courseName"
                className="form-control"
                value={data.courseName}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
        </div>
        {/* Add more fields below */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-gradePercentage`}>Grade Percentage:</label>
              <input
                type="text"
                id={`${educationLevel}-gradePercentage`}
                name="gradePercentage"
                className="form-control"
                value={data.gradePercentage}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-hasBacklogs`}>Has Backlogs:</label>
              <input
                type="checkbox"
                id={`${educationLevel}-hasBacklogs`}
                name="hasBacklogs"
                className="form-check-input"
                checked={data.hasBacklogs}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
        </div>
        {data.hasBacklogs && (
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor={`${educationLevel}-numberOfBacklogs`}>Number of Backlogs:</label>
                <input
                  type="number"
                  id={`${educationLevel}-numberOfBacklogs`}
                  name="numberOfBacklogs"
                  className="form-control"
                  value={data.numberOfBacklogs}
                  onChange={(e) => handleChange(e, educationLevel)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-durationStart`}>Duration Start:</label>
              <input
                type="date"
                id={`${educationLevel}-durationStart`}
                name="durationStart"
                className="form-control"
                value={data.durationStart}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor={`${educationLevel}-durationEnd`}>Duration End:</label>
              <input
                type="date"
                id={`${educationLevel}-durationEnd`}
                name="durationEnd"
                className="form-control"
                value={data.durationEnd}
                onChange={(e) => handleChange(e, educationLevel)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderRemainingForms = () => {
    const { educationLevel } = formData
    switch (educationLevel) {
      case 'Post Graduation':
        return (
          <>
            {renderEducationLevelForm('Post Graduation', 'Post Graduation', postGraduationData)}
            {renderEducationLevelForm('Graduation', 'Graduation', graduationData)}
            {renderEducationLevelForm('Inter or Diploma', 'Inter or Diploma', interOrDiplomaData)}
            {renderEducationLevelForm('SSC', 'SSC', sscData)}
          </>
        )
      case 'GRADUATION':
        return (
          <>
            {renderEducationLevelForm('Graduation', 'Graduation', graduationData)}
            {renderEducationLevelForm('Inter or Diploma', 'Inter or Diploma', interOrDiplomaData)}
            {renderEducationLevelForm('SSC', 'SSC', sscData)}
          </>
        )
      case 'Inter or Diploma':
        return (
          <>
            {renderEducationLevelForm('Inter or Diploma', 'Inter or Diploma', interOrDiplomaData)}
            {renderEducationLevelForm('SSC', 'SSC', sscData)}
          </>
        )
      case 'SSC':
        return renderEducationLevelForm('SSC', 'SSC', sscData)
      default:
        return null
    }
  }

  return (
    <div className="container mt-3 mb-3">
      <h2>Education Details</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="educationLevel">Select Highest Education Level:</label>
          <select
            id="educationLevel"
            name="educationLevel"
            className="form-control mt-3 mb-3"
            value={formData.educationLevel}
            onChange={(e) => handleEducationLevelChange(e.target.value)}
          >
            <option value="">Select Education Level</option>
            <option value="Post Graduation">Post Graduation</option>
            <option value="Graduation">Graduation</option>
            <option value="Inter or Diploma">Inter or Diploma</option>
            <option value="SSC">SSC</option>
          </select>
        </div>

        {renderRemainingForms()}

        <div className="">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

EducationForm.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}

export default EducationForm
