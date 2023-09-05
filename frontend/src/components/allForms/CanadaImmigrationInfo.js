/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function CanadaBiometricsInfo({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [id, setId] = useState('')
  const [biometricsGiven, setBiometricsGiven] = useState(false)
  const [biometricsDate, setBiometricsDate] = useState('')

  const [medicalsGiven, setMedicalsGiven] = useState(false)
  const [medicalsDate, setMedicalsDate] = useState('')
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/canadaimmigrationinfo/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        var { data } = response.data
        setDataLength(data.length)
        data = data[0]
        console.log(data)
        console.log(data.biometrics_given)
        setId(data.id || '')
        setBiometricsGiven(data.biometrics_given === 'Yes')
        setBiometricsDate(data.biometrics_date || '')
        setMedicalsGiven(data.medicals_given === 'Yes')
        setMedicalsDate(data.medicals_date || '')
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
      // Perform Axios POST request to your API endpoint
      if (dataLength > 0) {
        const response = await axios.put(
          'http://127.0.0.1:8000/canadaimmigrationinfo/',
          { id, biometricsGiven, biometricsDate, medicalsGiven, medicalsDate },
          {
            headers: headers,
          },
        )
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('eleven')
        }
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/canadaimmigrationinfo/',
          {
            biometricsGiven,
            biometricsDate,
            medicalsGiven,
            medicalsDate,
          },
          {
            headers: headers,
          },
        )

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('eleven')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  return (
    <div className="container mt-5">
      <h2>Canada Biometrics and Medicals</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label>Did you give your Biometrics for Canada?</label>
            <div className="form-check">
              <input
                name="biometricsGiven"
                type="checkbox"
                className="form-check-input"
                id="biometricsGiven"
                checked={biometricsGiven}
                onChange={(e) => setBiometricsGiven(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="biometricsGiven">
                Yes
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {biometricsGiven && (
              <div>
                <label>Date of Biometrics (YYYY-MM-DD)</label>
                <input
                  name="biometricsDate"
                  type="date"
                  className="form-control"
                  value={biometricsDate}
                  onChange={(e) => setBiometricsDate(e.target.value)}
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label>Did you give your Medicals for Canada?</label>
            <div className="form-check">
              <input
                name="medicalsGiven"
                type="checkbox"
                className="form-check-input"
                id="medicalsGiven"
                checked={medicalsGiven}
                onChange={(e) => setMedicalsGiven(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="medicalsGiven">
                Yes
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {medicalsGiven && (
              <div>
                <label>Date of Medicals (YYYY-MM-DD)</label>
                <input
                  name="medicalsDate"
                  type="date"
                  className="form-control"
                  value={medicalsDate}
                  onChange={(e) => setMedicalsDate(e.target.value)}
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
                />
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
CanadaBiometricsInfo.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
export default CanadaBiometricsInfo
