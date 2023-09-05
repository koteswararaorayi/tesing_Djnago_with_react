import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

function VisaRefusals({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [visaDetails, setVisaDetails] = useState([
    { id: '', country: '', reason: '', type: '', comments: '' },
  ])
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/visarefusals/', {
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
            reason: item.reason_for_rejection || '',
            type: item.type_of_visa || '',
            comments: item.additional_comments || '',
          }))

          // Set the formData state with the filtered data.
          setVisaDetails(filteredData)
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
    const newDetail = { country: '', reason: '', type: '', comments: '' }
    setVisaDetails([...visaDetails, newDetail])
  }

  const handleRemoveDetail = (index) => {
    const updatedDetails = [...visaDetails]
    updatedDetails.splice(index, 1)
    setVisaDetails(updatedDetails)
  }

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...visaDetails]
    updatedDetails[index][field] = value
    setVisaDetails(updatedDetails)
  }

  // const history = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const jwtToken = Cookie.get('access_token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    }
    const apiUrl = 'http://127.0.0.1:8000/visarefusals/'

    try {
      if (dataLength > 0) {
        const response = await axios.put(apiUrl, visaDetails, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('ten')
        }
      } else {
        const response = await axios.post(apiUrl, visaDetails, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('ten')
        }
      }
    } catch (error) {
      // Handle error
    }
  }

  const visaTypes = ['Student Visa', 'Work Visa', 'Business Visa', 'Tourist Visa', 'Family Visa']

  return (
    <div>
      <h2>Visa Refusals</h2>
      {visaDetails.map((detail, index) => (
        <div key={index} className="detail-container mb-4 p-3 border">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mt-3">
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={detail.country}
                  onChange={(e) => handleDetailChange(index, 'country', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mt-3">
                <label>Reason for Rejection</label>
                <input
                  type="text"
                  placeholder="Reason for Rejection"
                  value={detail.reason}
                  onChange={(e) => handleDetailChange(index, 'reason', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-3">
                <label>Type of Visa</label>
                <select
                  value={detail.type}
                  onChange={(e) => handleDetailChange(index, 'type', e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Type of Visa</option>
                  {visaTypes.map((visaType) => (
                    <option key={visaType} value={visaType}>
                      {visaType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-5 mt-3">
                <label>Additional Comments</label>
                <input
                  type="text"
                  placeholder="Additional Comments"
                  value={detail.comments}
                  onChange={(e) => handleDetailChange(index, 'comments', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-3">
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger float-end"
                    onClick={() => handleRemoveDetail(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      ))}
      <div>
        <button type="button" className="btn btn-primary" onClick={handleAddDetail}>
          Add Detail
        </button>
      </div>

      <div className="d-flex">
        <button type="button" className="btn btn-success mt-2 m-auto" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}
VisaRefusals.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
export default VisaRefusals
