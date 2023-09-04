/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function ProgramsInterested({ onTabChange }) {
  // const navigate = useNavigate()
  const [programs, setPrograms] = useState([
    { stream: '', duration: '', location: '', comments: '' },
  ])

  const handleAddProgram = () => {
    setPrograms([...programs, {}])
  }

  const handleRemoveProgram = (index) => {
    const updatedPrograms = programs.filter((_, i) => i !== index)
    setPrograms(updatedPrograms)
  }

  const handleProgramChange = (e, index) => {
    const { name, value } = e.target
    const updatedPrograms = [...programs]
    updatedPrograms[index] = {
      ...updatedPrograms[index],
      [name]: value,
    }
    setPrograms(updatedPrograms)
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
      const response = await axios.post('http://127.0.0.1:8000/programsinterested/', programs, {
        headers: headers,
      })

      console.log('Response:', response.data)
      if (response.status === 201) {
        onTabChange('nine')
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  return (
    <div className="container mt-5">
      <h2>Programs Interested</h2>
      <form onSubmit={handleSubmit}>
        {programs.map((program, index) => (
          <div key={index} className="mb-4 border p-3">
            <div className="row">
              <div className="col-md-6">
                <label>Stream</label>
                <input
                  type="text"
                  name="stream"
                  value={program.stream}
                  onChange={(e) => handleProgramChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={program.duration}
                  onChange={(e) => handleProgramChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={program.location}
                  onChange={(e) => handleProgramChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Additional Comments</label>
                <input
                  type="text"
                  name="comments"
                  value={program.comments}
                  onChange={(e) => handleProgramChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveProgram(index)}
              >
                Remove
              </button>
            )}
            {/* <div className="row justify-content-between mt-3">
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={() => handleRemoveProgram(index)}
                >
                  Remove
                </button>
              </div>
            </div> */}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={handleAddProgram}>
          Add More
        </button>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6 text-center">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
ProgramsInterested.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
export default ProgramsInterested
