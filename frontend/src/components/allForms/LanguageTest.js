/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

function TestForm({ onTabChange }) {
  const [formData, setFormData] = useState({
    id: null,
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

  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')

      const response = await axios.get('http://127.0.0.1:8000/languagetest/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        const { data } = response.data // Access data correctly
        console.log(data)
        setFormData({
          id: data.id || null,
          testType: data.ExamType || '', // Use the correct keys
          category: data.Category || '',
          listening: data.Listening || '',
          reading: data.Reading || '',
          writing: data.Writing || '',
          speaking: data.Speaking || '',
          overallScore: data.OverAllScore || '',
          dateOfTest: data.DateOfTest || '',
          dateOfResult: data.DateOfResult || '',
        })
      }
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Cookie.get('access_token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const apiUrl = 'http://127.0.0.1:8000/languagetest/'

    try {
      if (formData.id) {
        const response = await axios.put(apiUrl, formData, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 200) {
          onTabChange('three')
        }
      } else {
        const response = await axios.post(apiUrl, formData, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('three')
        }
      }
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
              max={getCurrentDate()}
              onFocus={(e) => e.target.blur()}
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
              min={formData.dateOfTest} // Set the minimum date to the Start Date
              max={getCurrentDate()}
              onFocus={(e) => e.target.blur()}
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
TestForm.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
export default TestForm
