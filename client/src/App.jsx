
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Headerr from "./Component/Navbar";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import DoctorRegister from "./Pages/DoctorRegister";
import PatientRegister from "./Pages/PatientRegister";
import Profile from "./Pages/Patient/Profile";

import ChangePassword from "./Pages/Patient/ChangePassword";


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

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
