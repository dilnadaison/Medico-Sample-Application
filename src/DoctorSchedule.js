import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

import { postData } from "./Services/postData";
// import axios from "axios";

export default function DoctorSchedule() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    status: "",
  });
  // const axios=require('axios');
  const [formErrors, setFormErrors] = useState({
    date: "",
    startTime: "",
    endTime: "",
    status: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!formData.date.trim()) {
      errors.date = "Date is required";
    }
    // else if (!dateRegex.test(formData.date)) {
    //   errors.date = "Date is not valid";
    // }
    if (!formData.startTime.trim()) {
      errors.department = "Start Time is required";
    }
    if (!formData.endTime.trim()) {
      errors.author = "End Time is required";
    }

    if (!formData.status.trim()) {
      errors.publisher = "Status is required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formattedDate = new Date(formData.date).toLocaleDateString('en-GB');
      const formattedStartTime = new Date(
        `01/01/2000 ${formData.startTime}`
      ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
      // Format the end time to AM/PM
      const formattedEndTime = new Date(
        `01/01/2000 ${formData.endTime}`
      ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
      try {
        postData("appointment",{...formData,
        date:formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,} ).then((response) => {
          console.log("Book added successfully");
          window.alert("Book added successfully");
          Navigate("/DoctorHome");
          window.location.reload();
        });
      } catch (error) {
        console.log("error occured");
        console.log(error);
      }
    }
  };
  return (
    <div className="doctor">
      <div className="scheduleform">
        <form onSubmit={handleSubmit}>
          <h2>
            <center>
              <b>Add Schedule Here!</b>
            </center>
          </h2>
          <br></br>

          <div className="input-container">
            <label for="name" className="labelname">
              <strong>Date</strong>
            </label>
            <input
              id="date"
              className="input"
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {formErrors.date && <p className="error">{formErrors.date}</p>}
          </div>

          <div className="input-container">
            <label for="startTime" className="labelname">
              <strong>Start Time</strong>
            </label>
            <input
              id="startTime"
              className="input"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
            {formErrors.startTime && (
              <p className="error">{formErrors.startTime}</p>
            )}
          </div>

          <div className="input-container">
            <label for="endTime" className="labelname">
              <strong>End Time</strong>
            </label>
            <input
              id="author"
              className="endTime"
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
            {formErrors.endTime && (
              <p className="error">{formErrors.endTime}</p>
            )}
          </div>

          <div className="input-container">
            <label for="status" className="labelname">
              <strong>Status</strong>
            </label>
            <select
              id="status"
              className="input"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" selected>
                Select
              </option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {formErrors.status && <p className="error">{formErrors.status}</p>}
          </div>

          <div className="button-container">
            <input type="submit" value="Submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
}
