/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function CanadaBiometricsInfo() {
  const navigate = useNavigate()
  const [biometricsGiven, setBiometricsGiven] = useState(false)
  const [biometricsDate, setBiometricsDate] = useState('')

  const [medicalsGiven, setMedicalsGiven] = useState(false)
  const [medicalsDate, setMedicalsDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('access_token') // Get the JWT token from Cookie
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      // Perform Axios POST request to your API endpoint
      const response = await axios.post(
        'http://your-api-url/submit-emergency-contact',
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
      navigate('/')
      // Handle success, e.g., navigate to another page
      // history.push("/another-page");
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

export default CanadaBiometricsInfo
