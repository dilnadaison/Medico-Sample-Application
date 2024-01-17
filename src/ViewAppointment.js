import React, { useEffect, useState } from "react";

import "./Style.css";
import { useNavigate } from "react-router";
import Table from "./Components/table";
import { fetchData } from "./Services/fetchData";

import { deleteData } from "./Services/deleteData";

export default function ViewAppointment() {
  const [state, setState] = useState([]);

  const Navigate = useNavigate();

  const [editForm, setEditForm] = useState(false);


  function dataRemove(id) {
    if (window.confirm("Are you sure want to delete ?")) {
      deleteData("appointment", id).catch((error) => console.log(error));
      window.location.reload();
    }
  }


  const headings = ["id", "date", "startTime", "endTime", "status"];
  useEffect(() => {
    fetchData("appointment").then((response) => {
       
      setState(response.data);
      console.log(response.data);
    
    });
  }, []);

  console.log(state);
  console.log(headings);
  return (
    <div className="doctor">
      {editForm === false ? (
        <div className="patientform">
          <h1 className="tablehead">
            
              <b>View Appointment Here!</b>
           
          </h1>
          <br></br><br></br><br></br>

          <Table
            headings={headings}
            data={state}
            deleteFn={dataRemove}
            editFn={editBook}
          ></Table>
        </div>
      ) : (
""
      )}
    </div>
  );

  function editBook(id) {
    setEditForm(true);
    localStorage.setItem("bookId", id);
    console.log();
    // state.map((data) => {
    //   return data.id.toString() === localStorage.getItem("bookId")
    //     ? setValue({
    //         id: data.id,
    //         name: data.name,
    //         department: data.department,
    //         author: data.author,
    //         publisher: data.publisher,
    //         status: data.status,
    //       })
    //     : "";
    // });
   
    
    Navigate("/EditBook")
    window.location.reload();
  }
}
