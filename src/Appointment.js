import React, { useEffect, useState } from "react";
import { fetchData } from "./Services/fetchData";
import Table from "./Components/table";
import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator } from "react-tabulator";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Appointment() {
  const navigate=useNavigate();
  useEffect(() => {
    try {
      fetchData("appointment").then((response) => {

        
        setDetails(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log("error occured!!!");
    }
  }, []);
  let user = localStorage.getItem("username");
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (date && day && month && year) {
      return `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`;
    } else {
      return "dd/mm/yyyy";
    }
  };
  const [date, setDate] = useState(() => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    return formattedDate;
  });
  const [details, setDetails] = useState([]);


  const appointment = details.filter(
    (data) => formatDate(date) === data.date 
  );
  // const handleButtonClick=(id)=>{
  //   alert('The button was clicked'+ id);
  // }

  const columns = [
    { title: "ID", field: "id" },
    { title: "Date", field: "date" },
    { title: "Start-Time", field: "startTime" },
    { title: "End-Time", field: "endTime" },
    { title: "Status", field: "status" },
    {
      title: "Actions",
      formatter: (cell, formatterParams, onRendered) => {
        const rowData = cell.getRow().getData();
        const isStatusNotAvailable = rowData.status === "Not Available";
  
      
      

        // return '  <button type="button" class="btn btn-primary btn-sm"}>Book Now</button> ';
     
        return `
        <button
          type="button"
          class="btn btn-${isStatusNotAvailable ? 'secondary' : 'primary'} btn-sm"
          ${isStatusNotAvailable ? 'disabled' : ''}
         
        >
          Book Now
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

  

  const headings = ["id", "date", "startTime", "endTime", "status"];
  return (
    <div className="appointment">
      <div className="para">
        <h3>
          Hi {user},<br></br> Make your Appointment Here!
        </h3>
        Choose your date{" "}
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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

export default Appointment;
