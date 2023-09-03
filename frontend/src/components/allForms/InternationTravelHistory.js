import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const TravelForm = () => {
  const navigate = useNavigate()

  const [travelDetails, setTravelDetails] = useState([
    { country: '', location: '', purpose: '', fromDate: '', toDate: '' },
  ])

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
    const headers = { Authorization: `Bearer ${jwtToken}` }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/internationaltravelhistory/',
        travelDetails,
        { headers },
      )
      console.log(response.data)
      // Handle success, you can use 'navigate' to redirect
      navigate('/forms/form-control') // Replace '/success' with your desired success route
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
                  id={`fromDate-${index}`}
                  className="form-control"
                  value={detail.fromDate}
                  onChange={(e) => handleDetailChange(index, 'fromDate', e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor={`toDate-${index}`} className="form-label">
                  To Date
                </label>
                <input
                  type="date"
                  id={`toDate-${index}`}
                  className="form-control"
                  value={detail.toDate}
                  onChange={(e) => handleDetailChange(index, 'toDate', e.target.value)}
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

export default TravelForm
