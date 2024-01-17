import React, { useEffect, useState } from "react";
import { fetchData } from "./Services/fetchData";
import Table from "./Components/table";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function TodayAppointment() {
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
//   const formatDate = (dateString) => {
//     let date = new Date(dateString);
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     if (date && day && month && year) {
//       return `${day < 10 ? "0" + day : day}/${
//         month < 10 ? "0" + month : month
//       }/${year}`;
//     } else {
//       return "dd/mm/yyyy";
//     }
//   };
const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
  
    return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
  };
  
  // Example usage
  const todayDate = getTodayDate();
  console.log(todayDate);
//   const [date, setDate] = useState(() => {
//     const currentDate = new Date();
//     const formattedDate = formatDate(currentDate);
//     return formattedDate;
//   });
 const [details, setDetails] = useState([]);


  const appointment = details.filter(
    (data) => todayDate=== data.bookingDate 
  );
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
          Hi {user},<br></br> Today's Appointment Here!
        </h3>
     
      </div>
      <div className="datatable">
      {appointment.length>0 &&
            <ReactTabulator
              key={appointment.id}
              data={appointment}
              columns={columns}
              layout={"fitColumns"}
            />
      }
      {appointment.length===0 && <h4>No Appointments for this day.</h4>}
      </div>
    </div>
  );
}

export default TodayAppointment;
