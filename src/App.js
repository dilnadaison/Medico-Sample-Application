
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
<Route path="/DoctorHome" element={<DoctorHome/>}/>
<Route path="/doctorschedule" element={<DoctorSchedule/>}/>
<Route path="Appointment" element={<Appointment/>}/>
<Route path="Patient" element={<Patient/>}/>
<Route path="viewappointment" element={<ViewAppointment/>}/>
</Routes>
</div>
</BrowserRouter>

    </div>
  );
}

export default App;
