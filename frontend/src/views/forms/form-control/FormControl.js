import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
//import DatePicker from 'react-datepicker'
//import 'react-datepicker/dist/react-datepicker.css'

function FormControl() {
  const [formData, setFormData] = useState({
    familyName: '',
    givenName: '',
    dob: '',
    email: '',
    alternateEmail: '',
    phoneNumber: '',
    maritalStatus: '',
    permanentAddress: '',
    presentAddress: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const jwtToken = Cookies.get('access_token')
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json', // Adjust content type if needed
    }
    try {
      // Convert date to the desired format
      // const formattedDate = formData.dob ? formData.dob.toISOString().substr(0, 10) : null
      // console.log(formattedDate)

      const response = await axios.post('http://127.0.0.1:8000/personal_details/', formData, {
        headers,
      })

      console.log('Response:', response.data)
      // Handle success here
    } catch (error) {
      console.error('Error:', error)
      // Handle error messages or actions here.
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // const handleDateChange = (date) => {
  //   setFormData((prevData) => ({ ...prevData, dob: date }))
  // }

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
              <input type="date" onChange={handleChange} name="dob" value={formData.dob} />

              {/* <DatePicker
                selected={formData.dob}
                onChange={handleDateChange}
                className="form-control"
                dateFormat="dd-MMM-yyyy"
                showYearDropdown
                yearDropdownItemNumber={50}
                scrollableYearDropdown
                showMonthDropdown
              /> */}
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
              type="tel"
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

export default FormControl
