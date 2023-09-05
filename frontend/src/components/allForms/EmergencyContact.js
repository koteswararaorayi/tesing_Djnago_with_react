/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function EmergencyContact({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    relation: '',
  })
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/emergencycontact/', {
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
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          address: data.full_address || '',
          email: data.email || '',
          phoneNumber: data.phone_number || '',
          relation: data.relation || '',
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
        const response = await axios.put(`http://127.0.0.1:8000/emergencycontact/`, formData, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('six')
        }
      } else {
        const response = await axios.post('http://127.0.0.1:8000/emergencycontact/', formData, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('six')
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phoneNumber') {
      // Ensure the input value is numeric and has a maximum length of 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
      }
    } else {
      // For other inputs, update the value directly
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    // setFormData((prevData) => ({ ...prevData, [name]: value }))
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
                type="number"
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
EmergencyContact.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}

export default EmergencyContact
