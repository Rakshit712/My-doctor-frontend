
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headerr from "./Component/Navbar";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import DoctorRegister from "./Pages/DoctorRegister";
import PatientRegister from "./Pages/PatientRegister";
import Profile from "./Pages/Patient/Profile";

import ChangePassword from "./Pages/Patient/ChangePassword";
import PatientAppointment from "./Pages/Patient/PatientAppointment";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";
import Qualification from "./Pages/Doctor/Qualification";
import Experience from "./Pages/Doctor/Experience";
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
import SpecialityPage from "./Pages/SpecialityPage";
import Search from "./Pages/Search";
import DoctorPage from "./Pages/Doctor/DoctorPage";
import BookAppoinment from "./Pages/AppointmentPages/BookAppoinment";


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/patientRegister" element={<PatientRegister/>}/>
        <Route path="/doctorRgister" element = {<DoctorRegister/>}/>
        <Route path="/patientprofile" element = {<Profile/>}/>
        <Route path="/changePassword" element = {<ChangePassword/>}/>
        <Route path="/patientAppointment" element ={<PatientAppointment/>}/>
        <Route path="/doctorProfile" element={<DoctorProfile/>}/>
        <Route path="/qualification" element={<Qualification/>}/>
        <Route path = "/experience" element = {<Experience/>}/>
        <Route path="/doctorDashboard" element= {<DoctorDashboard/>}/>
        <Route path = "/specialities" element={<SpecialityPage/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path ="/doctor" element = {<DoctorPage/>}/>
        <Route path= "/bookAppointment" element = {<BookAppoinment/>}/>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
