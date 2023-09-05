/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Cookie from 'js-cookie'

function PersonalDetails({ onTabChange }) {
  const [dataLength, setDataLength] = useState(0)

  const [formData, setFormData] = useState({
    id: '',
    familyName: '',
    givenName: '',
    dob: null,
    email: '',
    alternateEmail: '',
    phoneNumber: '',
    maritalStatus: '',
    permanentAddress: '',
    presentAddress: '',
  })
  const fetchData = async () => {
    try {
      const token = Cookie.get('access_token')
      const response = await axios.get('http://127.0.0.1:8000/personaldetails/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 200) {
        var { data } = response.data
        setDataLength(data.length)
        data = data[0]
        // Set the formData state with the retrieved data
        setFormData({
          id: data.id || '',
          familyName: data.FamilyName || '',
          givenName: data.Name || '',
          dob: data.Dob ? new Date(data.Dob) : null,
          email: data.EmailId || '',
          alternateEmail: data.AlterEmailId || '',
          phoneNumber: data.PhoneNumber || '',
          maritalStatus: data.MaritalStatus || '',
          permanentAddress: data.PermanentAddress || '',
          presentAddress: data.PresentAddress || '',
        })
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
      const formattedDate = formData.dob ? formData.dob.toISOString().substr(0, 10) : null
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      if (dataLength > 0) {
        const response = await axios.put(
          `http://127.0.0.1:8000/personaldetails/?id=${formData.id}`,
          {
            ...formData,
            dob: formattedDate,
          },
          { headers: headers },
        )
        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('two')
        } else {
          console.error('Error:', response.data)
        }
      } else {
        const response = await axios.post(
          'http://127.0.0.1:8000/personaldetails/',
          {
            ...formData,
            dob: formattedDate,
          },
          { headers: headers },
        )

        console.log('Response:', response.data)
        if (response.status === 201) {
          onTabChange('two')
        } else {
          console.error('Error:', response.data)
        }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phoneNumber') {
      // Ensure the input value is numeric and has a maximum length of 10 characters
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
      }
    } else {
      // For other inputs, update the value directly
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dob: date }))
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Family Name (as per passport)</label>
            <input
              type="text"
              className="form-control"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Given Name (as per passport)</label>
            <input
              type="text"
              className="form-control"
              name="givenName"
              value={formData.givenName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Date of Birth (DD-MONTH-YYYY)</label>
            <div className="form-group">
              <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="dd-MMM-yyyy"
                showYearDropdown
                yearDropdownItemNumber={50}
                scrollableYearDropdown
                showMonthDropdown
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Alternate Email</label>
            <input
              type="email"
              className="form-control"
              name="alternateEmail"
              value={formData.alternateEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Marital Status</label>
            <select
              className="form-control"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Permanent Address (with postal code)</label>
            <textarea
              className="form-control"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Present Address (with postal code)</label>
            <textarea
              className="form-control"
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

PersonalDetails.propTypes = {
  onTabChange: PropTypes.func.isRequired,
}

export default PersonalDetails
