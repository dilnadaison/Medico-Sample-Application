import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Checkbox,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData } from "./Services/postData";
import { fetchDatabyID } from "./Services/fetchDatabyID";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { updateData } from "./Services/updateData";
const BookingForm = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [details, setDetails] = useState([]);
  const useremail=localStorage.getItem("useremail");
  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   setFormData((prevData) => ({ ...prevData, roomType: option }));
  // };
  console.log(id);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    phone: "",
    department: "",
    bookingDate: "",
    email: "",
    symptoms: "",
    bookingTime: "",
  });
  // useEffect(()=>{
  //   axios.get(`http://localhost:3001/rooms`).then((response)=>{
  //     setRooms(response.data);

  // }
  //   )
  // },[])
  useEffect(() => {
    fetchDatabyID("appointment", id).then((appointmentResp) => {
      // This function used to Fetch hotel details by using id
      const appDetails = appointmentResp.data;
      setFormData((prevData) => ({
        ...prevData,
        bookingDate: appDetails.date,
        bookingTime: appDetails.startTime + " - " + appDetails.endTime,
      }));

      fetchDatabyID("user","3").then((detailsResponse) => {
        setDetails(detailsResponse.data);
        console.log(details);
      });
    });
  }, [id]);

  const handleChange = (e) => {
    //This function used to set formdata while user type anything in the field
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    //This is function used while submitting form.
    e.preventDefault();

    try {
      const appointmentDetails = await fetchDatabyID("appointment", id); //This is function used to fetch hotels by id
      const appointment = appointmentDetails.data;

      const response = await postData("booking", {
        //This is function used to post booking details to the bookings
        patientName: formData.patientName,
        doctorName: details.name,
        email: formData.email,
        department: details.department,
        bookingDate: formData.bookingDate,
        phone: formData.phone,
        symptoms: formData.symptoms,
        bookingTime: formData.bookingTime,
        useremail:useremail,
        appointmentId:id,
        status:false
      });
    //   updateData("appointment",id,{
    //     status:"Not Available"
    //   })

    //   toast.success("Successfully Booked!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 1000,
    //   });
    // navigate("/home")
    //   //   na(`/`);
  
      await updateData("appointment", id, { status: "Not Available" });
  
      toast.success("Successfully Booked!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
  
      navigate("/home");
   
    } catch (error) {
      toast.error("Booking Failed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }

  };

  if ("User") {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Make Appointment Here!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Left Column */}
              <Grid item xs={6}>
                <TextField
                  label="Patient Name"
                  variant="outlined"
                  fullWidth
                  id="patientName"
                  margin="normal"
                  onChange={handleChange}
                  name="patientName"
                  value={formData.patientName}
                  required
                />
                <TextField
                  label="Doctor Name"
                  variant="outlined"
                  fullWidth
                  id="doctorName"
                  margin="normal"
                  name="doctorName"
                  value={details.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
                <TextField
                  label="Booking Date"
                  variant="outlined"
                  fullWidth
                  id="bookingDate"
                  margin="normal"
                  name="bookingDate"
                  value={formData.bookingDate}
                  required
                />

                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  id="phone"
                  margin="normal"
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  value={formData.phone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  margin="normal"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  required
                />
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  id="department"
                  margin="normal"
                  name="department"
                  value={details.department}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />

                <TextField
                  label="Booking Time"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="bookingTime"
                  id="bookingTime"
                  value={formData.bookingTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />

                <TextField
                  label="Symptoms"
                  variant="outlined"
                  fullWidth
                  id="symptoms"
                  margin="normal"
                  onChange={handleChange}
                  name="symptoms"
                  value={formData.symptoms}
                  required
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Book Now
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
};

export default BookingForm;
