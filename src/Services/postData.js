
import axios from "axios";

const API_URL = "http://localhost:3000/";
export const postData = (url,data) => {
   
    return  axios.post(`${API_URL}${url}`,data);    
   
  };
  