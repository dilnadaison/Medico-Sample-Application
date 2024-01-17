import { Navigate, Outlet } from 'react-router-dom';
export default function Protected() {    
const isAuthenticated = localStorage.getItem("loggedin"); 
// const Navigate=useNavigate();

return isAuthenticated==="true" ? <Outlet /> : <Navigate to="/Login" />;
          
}