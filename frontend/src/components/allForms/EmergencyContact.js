/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function EmergencyContact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    relation: '',
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
      const response = await axios.post('http://your-api-url/submit-emergency-contact', formData, {
        headers: headers,
      })

      console.log('Response:', response.data)
      navigate('/')
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
      <h2>Emergency Contact Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Full Address with Postal Zipcode</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Relation</label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="form-control"
            />
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

export default EmergencyContact
