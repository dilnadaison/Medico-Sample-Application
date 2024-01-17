import React, { useEffect, useState } from "react";

import "./Style.css";
import { useNavigate } from "react-router";
import Table from "./Components/table";
import { fetchData } from "./Services/fetchData";

import { deleteData } from "./Services/deleteData";

export default function Patient() {
  const [state, setState] = useState([]);

  const Navigate = useNavigate();

  const [editForm, setEditForm] = useState(false);


  function dataRemove(id) {
    if (window.confirm("Are you sure want to delete ?")) {
      deleteData("user", id).catch((error) => console.log(error));
      window.location.reload();
    }
  }

  
    const filteredItems = state.filter(
      (item) =>
        item.role === "Patient"
    );
  const headings = ["id", "name", "address", "email", "phone"];
  useEffect(() => {
    fetchData("user").then((response) => {
       
      setState(response.data);
      console.log(response.data);
    
    });
  }, []);

  console.log(state);
  console.log(headings);
  return (
    <div className="viewpatient">
      {editForm === false ? (
        <div className="patientform">
          <h1>
          
              <b>View Patients Here!</b>
         
          </h1>
          <br></br>

          <Table
            headings={headings}
            data={filteredItems}
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
