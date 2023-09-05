/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function ParentsDetails({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [formData, setFormData] = useState({
    id: '',
    fatherName: '',
    fatherDOB: '',
    fatherAddress: '',
    fatherOccupation: '',
    fatherIncome: '',
    motherName: '',
    motherDOB: '',
    motherAddress: '',
    motherOccupation: '',
    motherIncome: '',
    motherDateOfDeath: '', // New field for Date of Death for mother
    fatherDateOfDeath: '',
  })
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/parentsdetails/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        var { data } = response.data
        setDataLength(data.length)
        data = data[0]
        console.log(data)

        const filteredData = {
          id: data.id || '',
          fatherName: data.father_name || '',
          fatherDOB: data.father_dob || '',
          fatherAddress: data.father_address || '',
          fatherOccupation: data.father_occupation || '',
          fatherIncome: data.father_annual_income || '',
          motherName: data.mother_name || '',
          motherDOB: data.mother_dob || '',
          motherAddress: data.mother_address || '',
          motherOccupation: data.mother_occupation || '',
          motherIncome: data.mother_annual_income || '',
          motherDateOfDeath: data.mother_dod || '', // New field for Date of Death for mother
          fatherDateOfDeath: data.father_dod || '',
        }

        // Set the formData state with the filtered data.
        setFormData(filteredData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('access_token') // Get the JWT token from Cookie
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    try {
      if (dataLength > 0) {
        const response = await axios.put(`http://127.0.0.1:8000/parentsdetails/`, formData, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('seven')
        }
      } else {
        const response = await axios.post('http://127.0.0.1:8000/parentsdetails/', formData, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('seven')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="container mt-5">
      <h2>Parents Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label>Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Date of Birth (D.O.B)</label>
              <input
                type="date"
                name="fatherDOB"
                value={formData.fatherDOB}
                onChange={handleChange}
                className="form-control"
                max={getCurrentDate()}
                onFocus={(e) => e.target.blur()}
              />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                name="fatherAddress"
                value={formData.fatherAddress}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label>Father Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Father Annual Income</label>
              <input
                type="number"
                name="fatherIncome"
                value={formData.fatherIncome}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label>Mother Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Date of Birth (D.O.B)</label>
              <input
                type="date"
                name="motherDOB"
                value={formData.motherDOB}
                onChange={handleChange}
                className="form-control"
                max={getCurrentDate()}
                onFocus={(e) => e.target.blur()}
              />
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                name="motherAddress"
                value={formData.motherAddress}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label>Mother Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Mother Annual Income</label>
              <input
                type="number"
                name="motherIncome"
                value={formData.motherIncome}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <h5>In case the parent(s) are deceased</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Date of Death (Father)</label>
                <input
                  type="date"
                  name="fatherDateOfDeath"
                  value={formData.fatherDateOfDeath}
                  onChange={handleChange}
                  className="form-control"
                  min={formData.fatherDOB} // Set the minimum date to the Start Date
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Date of Death (Mother)</label>
                <input
                  type="date"
                  name="motherDateOfDeath"
                  value={formData.motherDateOfDeath}
                  onChange={handleChange}
                  className="form-control"
                  min={formData.motherDOB} // Set the minimum date to the Start Date
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
ParentsDetails.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default ParentsDetails
