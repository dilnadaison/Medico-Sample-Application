import axios from "axios";

const API_URL = "http://localhost:3000/";
export const deleteData = (url,id) => {
   
    return axios.delete(`${API_URL}${url}/${id}`);    
   
  };
  