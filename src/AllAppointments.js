import React, { useEffect, useState } from "react";
import { fetchData } from "./Services/fetchData";
import Table from "./Components/table";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AllAppointment() {
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


 const [details, setDetails] = useState([]);



  // const handleButtonClick=(id)=>{
  //   alert('The button was clicked'+ id);
  // }

  const columns = [
    { title: "ID", field: "id" },
    { title: "Patient Name", field: "patientName" },
    { title: "Booking Date", field: "bookingDate" },
    { title: "Booking Time", field: "bookingTime",width:150 },
    { title: "Symptoms", field: "symptoms" },
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
        const appointmentId = rowData.id;
        // const status=localStorage.getItem("loggedin");
        // // Use history to navigate to the desired route
        // console.log(status);
        // if(status==="true"){
        navigate(`/booking/${appointmentId}`);
        // }
        // else{
        //   alert("Please Login first");
        //   navigate(
        //     "/Login"
        //   )
        // }
      },
    }
  ];

  

  const headings = ["id", "patientName", "bookingDate", "bookingTime", "symptoms","phone"];
  return (
    <div className="appointment">
      <div className="para">
        <h3>
          Hi {user},<br></br> View all Appointment Here!
        </h3>
     
      </div>
      <div className="datatable">
      {details.length>0 &&
            <ReactTabulator
              key={details.id}
              data={details}
              columns={columns}
              layout={"fitColumns"}
            />
      }
      {details.length===0 && <h4>No Appointments for this day.</h4>}
      </div>
    </div>
  );
}

export default AllAppointment;
