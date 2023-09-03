/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function WorkExperienceForm() {
  const navigate = useNavigate()
  const [workExperienceList, setWorkExperienceList] = useState([
    {
      designation: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
    },
  ])

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
        'http://127.0.0.1:8000/workexperience/',
        workExperienceList,
        { headers: headers },
      )

      console.log('Response:', response.data)
      navigate('/forms/form-control')
      // Handle success, e.g., navigate to another page
      // history.push("/another-page");
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target
    setWorkExperienceList((prevList) => {
      const updatedList = [...prevList]
      updatedList[index][name] = value
      return updatedList
    })
  }

  const handleAddMore = () => {
    setWorkExperienceList((prevList) => [
      ...prevList,
      {
        designation: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
      },
    ])
  }

  const handleRemove = (index) => {
    setWorkExperienceList((prevList) => {
      const updatedList = [...prevList]
      updatedList.splice(index, 1)
      return updatedList
    })
  }

  return (
    <div className="container mt-5">
      <h2>Work Experience</h2>
      <form onSubmit={handleSubmit}>
        {workExperienceList.map((experience, index) => (
          <div key={index} className="mb-4 border p-3">
            <div className="row">
              <div className="col-md-6">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={experience.designation}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label> Location</label>
                <input
                  type="text"
                  name="location"
                  value={experience.location}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={experience.startDate}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={experience.endDate}
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="text-end mt-3">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="text-center">
          <button type="button" onClick={handleAddMore} className="btn btn-primary">
            Add More
          </button>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default WorkExperienceForm
