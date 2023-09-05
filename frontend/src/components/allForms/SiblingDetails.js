/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function SiblingDetails({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [siblings, setSiblings] = useState([
    {
      id: '',
      relation: '',
      siblingName: '',
      siblingDOB: '',
      maritalStatus: '',
      address: '',
      siblingOccupation: '',
      siblingIncome: '',
    },
  ])
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/siblingsdetails/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        var { data } = response.data
        setDataLength(data.length)
        console.log(data)
        if (data.length > 0) {
          // Use map to extract the desired fields from each item.
          const filteredData = data.map((item) => ({
            id: item.id || '',
            relation: item.relation || '',
            siblingName: item.sibling_name || '',
            siblingDOB: item.sibling_dob || '',
            maritalStatus: item.sibling_marital_status || '',
            address: item.sibling_address || '',
            siblingOccupation: item.sibling_occupation || '',
            siblingIncome: item.sibling_annual_income || '',
          }))

          // Set the formData state with the filtered data.
          setSiblings(filteredData)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    try {
      if (dataLength > 0) {
        const response = await axios.put('http://127.0.0.1:8000/siblingsdetails/', siblings, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('eight')
        }
      } else {
        const response = await axios.post('http://127.0.0.1:8000/siblingsdetails/', siblings, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('eight')
        }
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
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
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
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default SiblingDetails
