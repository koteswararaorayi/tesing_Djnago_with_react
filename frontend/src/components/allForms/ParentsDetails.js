/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

function ParentsDetails() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('access_token') // Get the JWT token from Cookie

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      // Perform Axios POST request to your API endpoint
      const response = await axios.post('http://your-api-url/submit-parents-details', formData, {
        headers: headers,
      })

      console.log('Response:', response.data)
      // Handle success, e.g., navigate to another page
      // history.push("/another-page");
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
                type="text"
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
                type="text"
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

export default ParentsDetails
