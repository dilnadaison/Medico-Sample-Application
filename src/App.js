
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './Style.css';
import Nav from './Nav';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Home from './Home';
import Appointment from './Appointment';
import DoctorHome from './DoctorHome';
import DoctorSchedule from './DoctorSchedule';
import Patient from './Patient';
import ViewAppointment from './ViewAppointment';
import BookingForm from './Booking';
import { ToastContainer } from 'react-toastify';
import MyAppointment from './MyAppointments';
import Protected from './Components/Protected';
function App() {
  return (
    <div className="App">
<BrowserRouter>
<Nav/>
<div >
<Routes>
<Route path="/" element={<Home />}></Route>
<Route path="/Login" element={<Login/>}/>
<Route path="/Home" element={<Home/>}/>
<Route path="/Appointment" element={<Appointment/>}/>
<Route path="/" element={<Protected />}>
<Route path="/DoctorHome" element={<DoctorHome/>}/>
<Route path="/doctorschedule" element={<DoctorSchedule/>}/>
<Route path="/myappointments" element={<MyAppointment/>}/>
<Route path="/booking/:id" element={<BookingForm/>}/>
<Route path="Patient" element={<Patient/>}/>
<Route path="viewappointment" element={<ViewAppointment/>}/>
</Route>
</Routes>
<ToastContainer/>
</div>
</BrowserRouter>

    </div>
  );
}

export default App;
