import React, { useEffect, useState } from "react";
import { fetchData } from "./Services/fetchData";
import Table from "./Components/table";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { deleteData } from "./Services/deleteData";
import { updateData } from "./Services/updateData";

function MyAppointment() {
  const navigate=useNavigate();
  useEffect(() => {
    try {
      fetchData("booking").then((response) => {
        setDetails(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log("error occured!!!");
    }
  }, []);
  let user = localStorage.getItem("username");
  let useremail=localStorage.getItem("useremail");
  const [details, setDetails] = useState([]);


  const booking = details.filter(
    (data) => data.useremail=== useremail
  );
  // const handleButtonClick=(id)=>{
  //   alert('The button was clicked'+ id);
  // }
console.log(booking);
  const columns = [
    { title: "ID", field: "id" ,width:100},
    { title: "Patient Name", field: "patientName",width:150},
    { title: "Doctor Name", field: "doctorName",width:150 },
    { title: "Booking Date", field: "bookingDate",width:150 },
    { title: "Booking Time", field: "bookingTime",width:150 },
    { title: "Symptoms", field: "symptoms" ,width:150},
    {
      title: "Actions",
      formatter: (cell, formatterParams, onRendered) => {
        const rowData = cell.getRow().getData();
      
  
      
      

        // return '  <button type="button" class="btn btn-primary btn-sm"}>Book Now</button> ';
     
        return `
        <button
          type="button"
          class="btn btn-primary btn-sm"
        
         
        >
          Cancel
        </button>
      `;
      },
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        const bookingId = rowData.id;
        const appointmentId=rowData.appointmentId;
        cancelBooking(bookingId,appointmentId);
        // navigate(`/booking/${appointmentId}`);
   
      },
    }
  ];
const cancelBooking=async(bid,appointmentId)=>{

await deleteData("booking",bid);
updateData("appointment", appointmentId, { status: "Available" });
window.location.reload();
}

  const headings = ["id", "date", "startTime", "endTime", "status"];
  return (
   <>
   
    <div className="booking">
   
    <div className="heading"><h2>My Appointments</h2></div>
      <div className="bookingdata">

      {booking.length>0 &&
            <ReactTabulator
              key={booking.id}
              data={booking}
              columns={columns}
              layout={"fitColumns"}
            />
      }
      {booking.length===0 && <h4>No Appointments for this day.</h4>}
      </div>
     
    </div>
    </>
  );
}

export default MyAppointment;
