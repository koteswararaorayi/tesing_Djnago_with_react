import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

function TravelForm({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [travelDetails, setTravelDetails] = useState([
    { id: '', country: '', location: '', purpose: '', fromDate: '', toDate: '' },
  ])
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/internationaltravelhistory/', {
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
            country: item.country || '',
            location: item.location || '',
            purpose: item.purpose || '',
            fromDate: item.from_date || '',
            toDate: item.to_date || '',
          }))

          // Set the formData state with the filtered data.
          setTravelDetails(filteredData)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddDetail = () => {
    setTravelDetails([
      ...travelDetails,
      { country: '', location: '', purpose: '', fromDate: '', toDate: '' },
    ])
  }

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...travelDetails]
    updatedDetails.splice(index, 1)
    setTravelDetails(updatedDetails)
  }

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...travelDetails]
    updatedDetails[index][field] = value
    setTravelDetails(updatedDetails)
  }

  const handleSubmit = async () => {
    const jwtToken = Cookie.get('access_token') // Replace with your actual JWT token
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    }
    const apiUrl = 'http://127.0.0.1:8000/internationaltravelhistory/'

    try {
      if (dataLength > 0) {
        const response = await axios.put(apiUrl, travelDetails, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('one')
        }
      } else {
        const response = await axios.post(apiUrl, travelDetails, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('one')
        }
      }
    } catch (error) {
      // Handle error here
    }
  }

  return (
    <div className="container mt-5">
      <h2>International Travel History</h2>
      {travelDetails.map((detail, index) => (
        <div key={index} className="border p-3 mb-3">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor={`country-${index}`} className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  id={`country-${index}`}
                  className="form-control"
                  placeholder="Country"
                  value={detail.country}
                  onChange={(e) => handleDetailChange(index, 'country', e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor={`location-${index}`} className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  id={`location-${index}`}
                  className="form-control"
                  placeholder="Location"
                  value={detail.location}
                  onChange={(e) => handleDetailChange(index, 'location', e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor={`purpose-${index}`} className="form-label">
                  Purpose
                </label>
                <input
                  type="text"
                  id={`purpose-${index}`}
                  className="form-control"
                  placeholder="Purpose"
                  value={detail.purpose}
                  onChange={(e) => handleDetailChange(index, 'purpose', e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label htmlFor={`fromDate-${index}`} className="form-label">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  id={`fromDate-${index}`}
                  className="form-control"
                  value={detail.fromDate}
                  onChange={(e) => handleDetailChange(index, 'fromDate', e.target.value)}
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor={`toDate-${index}`} className="form-label">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  id={`toDate-${index}`}
                  className="form-control"
                  value={detail.toDate}
                  onChange={(e) => handleDetailChange(index, 'toDate', e.target.value)}
                  min={detail.fromDate} // Set the minimum date to the Start Date
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
              <div className="col-md-6 d-flex justify-content-end align-items-end">
                {index > 0 && (
                  <button className="btn btn-danger" onClick={() => handleRemoveDetail(index)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      ))}
      <div>
        <button className="btn btn-primary" onClick={handleAddDetail}>
          Add More
        </button>
      </div>
      <div className="d-flex">
        <div className="m-auto">
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
TravelForm.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
export default TravelForm
