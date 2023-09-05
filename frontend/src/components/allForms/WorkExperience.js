/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

function WorkExperienceForm({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)
  const [workExperienceList, setWorkExperienceList] = useState([
    {
      id: '',
      designation: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
    },
  ])
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/workexperience/', {
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
            designation: item.designation || '',
            companyName: item.company_name || '',
            location: item.location || '',
            startDate: item.duration_start || '',
            endDate: item.duration_end || '',
          }))

          // Set the formData state with the filtered data.
          setWorkExperienceList(filteredData)
        }
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

    try {
      const token = Cookie.get('access_token')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      if (dataLength > 0) {
        const response = await axios.put(
          'http://127.0.0.1:8000/workexperience',
          workExperienceList,
          { headers: headers },
        )
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('five')
        }
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/workexperience/',
          workExperienceList,
          { headers: headers },
        )

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('five')
        }
      }
    } catch (error) {
      console.error('Error:', error)
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
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
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
                  min={experience.startDate} // Set the minimum date to the Start Date
                  max={getCurrentDate()}
                  onFocus={(e) => e.target.blur()}
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
WorkExperienceForm.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}
function getCurrentDate() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default WorkExperienceForm
