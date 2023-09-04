/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function SiblingDetails({ onTabChange }) {
  // const navigate = useNavigate()
  const [siblings, setSiblings] = useState([
    {
      siblingName: '',
      siblingDOB: '',
      maritalStatus: '',
      address: '',
      siblingOccupation: '',
      siblingIncome: '',
    },
  ])

  const handleAddSibling = () => {
    setSiblings([...siblings, {}])
  }

  const handleRemoveSibling = (index) => {
    const updatedSiblings = siblings.filter((_, i) => i !== index)
    setSiblings(updatedSiblings)
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const updatedSiblings = [...siblings]
    updatedSiblings[index] = {
      ...updatedSiblings[index],
      [name]: value,
    }
    setSiblings(updatedSiblings)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('access_token') // Get the JWT token from Cookie

    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      // Perform Axios POST request to your API endpoint
      const response = await axios.post('http://127.0.0.1:8000/siblingsdetails/', siblings, {
        headers: headers,
      })

      console.log('Response:', response.data)
      if (response.status === 201) {
        onTabChange('eight')
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  return (
    <div className="container mt-5">
      <h2>Sibling Details</h2>
      <form onSubmit={handleSubmit}>
        {siblings.map((sibling, index) => (
          <div key={index} className="mb-4 border p-3">
            <div className="row">
              <div className="col-md-6">
                <label>Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={sibling.relation}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Sibling Name</label>
                <input
                  type="text"
                  name="siblingName"
                  value={sibling.siblingName}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>D.O.B</label>
                <input
                  type="date"
                  name="siblingDOB"
                  value={sibling.siblingDOB}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={sibling.maritalStatus}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                >
                  <option value="">Select...</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                  <option value="divorced">Divorced</option>
                  <option value="single_parent">Single Parent</option>
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={sibling.address}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Sibling Occupation</label>
                <input
                  type="text"
                  name="siblingOccupation"
                  value={sibling.siblingOccupation}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>Sibling Annual Income</label>
                <input
                  type="number"
                  name="siblingIncome"
                  value={sibling.siblingIncome}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveSibling(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddSibling}>
          Add More
        </button>
        <div className="row justify-content-center mt-3">
          <div className="col-md-3 text-center">
            <button type="submit" className="btn btn-success mt-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
SiblingDetails.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}

export default SiblingDetails
