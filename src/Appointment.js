import React, {useEffect, useState } from 'react'
import { fetchData } from './Services/fetchData';

function Appointment() {
    let user=localStorage.getItem("username")
    const [date,setDate]=useState("dd-mm-yyyy")
   const[details,setDetails]=useState();
      const formatDate = (dateString) => {
        let date = new Date(dateString);
        let day = date.getDate();
        let month =date.getMonth() + 1;
        let year = date.getFullYear();
    if(date&&day&&month&&year){
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
      }
      else{
        return "dd-mm-yyyy"
      }

    };
    // useEffect(() => {
    //     try {
    //       fetchData("appointment").then((response) => {
    //         setDetails(response.data);
    //         console.log(response.data);
    //       });
    //     } catch (error) {
    //       console.log("error occured!!!")
    //     }
       
    //   }, []);
    const headings = ["id","date","startTime","endTime","status"];
  return (
    <div className='appointment'>
        <div className='para'> 
            <h3>Hi {user},<br></br> Make your Appointment Here!</h3 >
            Choose your date <input type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>

        </div>
        SelectedDate={formatDate(date)}
    
    </div>
  )
}

export default Appointment