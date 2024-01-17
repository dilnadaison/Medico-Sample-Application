import axios from "axios";

const API_URL = "http://localhost:3000/";
export const updateData = (url,id,data) => {
   
    return axios.patch(`${API_URL}${url}/${id}`,data);    
   
  };
  