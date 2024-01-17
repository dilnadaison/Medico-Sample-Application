
import axios from "axios";

const API_URL = "http://localhost:3000/";
export const fetchDatabyID = (url,id) => {
   
    return  axios.get(`${API_URL}${url}/${id}`);    
   
  };
  