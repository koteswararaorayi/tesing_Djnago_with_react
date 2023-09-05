/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function ProgramsInterested({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [programs, setPrograms] = useState([
    { id: '', stream: '', duration: '', location: '', comments: '' },
  ])
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/programsinterested/', {
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
            stream: item.stream || '',
            duration: item.duration || '',
            location: item.location || '',
            comments: item.additional_comments || '',
          }))

          // Set the formData state with the filtered data.
          setPrograms(filteredData)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
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
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    try {
      if (dataLength > 0) {
        const response = await axios.put('http://127.0.0.1:8000/programsinterested/', programs, {
          headers: headers,
        })
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('nine')
        }
      } else {
        const response = await axios.post('http://127.0.0.1:8000/programsinterested/', programs, {
          headers: headers,
        })

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('nine')
        }
      }

      // Perform Axios POST request to your API endpoint
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
