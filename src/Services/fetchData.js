
import axios from "axios";

const API_URL = "http://localhost:3000/";
export const fetchData =(url) => {
   
    return  axios.get(`${API_URL}${url}`);    
   
  };
  
  