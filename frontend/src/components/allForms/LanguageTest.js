/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie'

function TestForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    testType: '',
    category: '',
    listening: '',
    reading: '',
    writing: '',
    speaking: '',
    overallScore: '',
    dateOfTest: '',
    dateOfResult: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = Cookie.get('access_token')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.post('http://your-api-endpoint.com/submit-test', formData, {
        headers: headers,
      })

      console.log('Response:', response.data)
      // Redirect to another page
      navigate('/success')
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
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Test Type (IELTS/TOEFL/PTE/DUOLINGO)</label>
            <select
              className="form-control"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              required
            >
              <option value="">Select Test Type</option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="PTE">PTE</option>
              <option value="DUOLINGO">DUOLINGO</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Category (ACADEMIC/GENERAL)</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="ACADEMIC">Academic</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Listening Score</label>
            <input
              type="number"
              className="form-control"
              name="listening"
              value={formData.listening}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Reading Score</label>
            <input
              type="number"
              className="form-control"
              name="reading"
              value={formData.reading}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Writing Score</label>
            <input
              type="number"
              className="form-control"
              name="writing"
              value={formData.writing}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Speaking Score</label>
            <input
              type="number"
              className="form-control"
              name="speaking"
              value={formData.speaking}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Overall Score</label>
            <input
              type="number"
              className="form-control"
              name="overallScore"
              value={formData.overallScore}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Test (DD-MM-YY)</label>
            <input
              type="date"
              className="form-control"
              name="dateOfTest"
              value={formData.dateOfTest}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Date of Result (DD-MM-YY)</label>
            <input
              type="date"
              className="form-control"
              name="dateOfResult"
              value={formData.dateOfResult}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default TestForm
