import React, { useState, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { RiBubbleChartFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { NavLink, useLocation } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ReviewsIcon from "@mui/icons-material/Reviews";
import DashboardIcon from "@mui/icons-material/Dashboard";


const Sidebar = () => {
  const { role } = useSelector((state) => state.user);
  const location = useLocation();
  const [patientProf, setPatientProf] = useState(false);
  const [doctorProf, setDoctorProf] = useState(false);

  useEffect(() => {
    
    if (
      location.pathname === "/doctorProfile" ||
      location.pathname === "/qualification" ||
      location.pathname === "/experience"
    ) {
      setDoctorProf(true);
    } else {
      setDoctorProf(false);
    }

    if (
      location.pathname === "/patientprofile" ||
      location.pathname === "/changePassword"
    ) {
      setPatientProf(true);
    } else {
      setPatientProf(false);
    }
  }, [location.pathname]);

  const handleToggle = () => {
    setPatientProf(!patientProf);
  };

  const handleBoggle = () => {
    setDoctorProf(!doctorProf);
  };

  return (
    <>
      {role === "doctor" ? (
        <div className="fixed top-[139px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <>
            <NavLink to={"/doctorDashboard"}>
              <div className="flex bg-gray-200 h-11 hover:bg-gray-200 p-2 gap-5">
                <DashboardIcon className="text-lg ml-4 text-gray-600" />
                <h1 className="ml-2">Dashboard</h1>
              </div> 
              </NavLink>
              <NavLink to={"/doctorProfile"} onClick={handleBoggle}>
                <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                  <PersonIcon className="ml-4 text-lg text-gray-600" />
                  <h1>Doctor Profile</h1>
                </div>
              </NavLink>
              

              {doctorProf && (
                <>
                  <NavLink to={"/doctorProfile"}>
                    <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-13">
                      <AccountCircleOutlinedIcon className="ml-4 text-lg text-gray-60" />
                      <h1>Personal Information</h1>
                    </div>
                  </NavLink>
                  <NavLink to={"/qualification"}>
                    <div className="flex pl-16 gap-6 hover:bg-gray-200 my-1 p-2 h-14">
                      <LockOutlinedIcon className="ml-4 text-lg text-gray-600" />
                      <h1>Qualifications</h1>
                    </div>
                  </NavLink>
                  <NavLink to={"/experience"}>
                    <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-14">
                      <LockOutlinedIcon className="ml-4 text-lg text-gray-600" />
                      <h1>Experience</h1>
                    </div>
                  </NavLink>
                </>
              )}

              <NavLink to={"/patientAppointment"}>
                <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                  <EventNoteIcon className="ml-4 text-lg text-gray-600" />
                  <h1>Appointments</h1>
                </div>
              </NavLink>

              <NavLink to={"/"}>
                <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                  <ReviewsIcon className="ml-4 text-lg text-gray-600" />
                  <h1>Reviews</h1>
                </div>
              </NavLink>
            </>
          </div>
        </div>
      ) : role === "patient" ? (
        <div className="fixed top-[130px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <> <NavLink to={'/'}>
              <div className="flex bg-gray-200 h-12 hover:bg-gray-200 p-2 gap-5">
                <IoMdPerson className="text-lg ml-4 text-gray-600" />
                <h2 className="ml-2">Doctors</h2>
              </div>
              </NavLink>
              <NavLink to={"/specialities"}>
              <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                <RiBubbleChartFill className="ml-4 text-lg text-gray-600" />
                <h1>Specialities</h1>
              </div>
              </NavLink>

              <NavLink to={"/patientAppointment"}>
                <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                  <EventNoteIcon className="ml-4 text-lg text-gray-600" />
                  <h1>My Appointments</h1>
                </div>
              </NavLink>

              <NavLink to={"/patientprofile"} onClick={handleToggle}>
                <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                  <PersonIcon className="ml-4 text-lg text-gray-600" />
                  <h1>Account Settings</h1>
                </div>
              </NavLink>
              {patientProf && (
                <>
                  <NavLink to={"/patientprofile"}>
                    <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-12">
                      <AccountCircleOutlinedIcon className="ml-4 text-lg text-gray-60" />
                      <h1>My Profile</h1>
                    </div>
                  </NavLink>
                  <NavLink to={"/changePassword"}>
                    <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-13">
                      <LockOutlinedIcon className="ml-4 text-lg text-gray-600" />
                      <h1>Change Password</h1>
                    </div>
                  </NavLink>
                </>
              )}
            </>
          </div>
        </div>
      ) : (
        <div className="fixed top-[130px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <><NavLink to={'/'}>
            
              <div className="flex bg-gray-200 hover:bg-gray-200 p-2 gap-5">
                <PersonIcon className="ml-4 text-lg text-gray-600" />
                <h1>Doctors</h1>
              </div>
              </NavLink>
              <NavLink to={"/specialities"}>
              <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                <RiBubbleChartFill className="ml-4 text-lg text-gray-600" />
                <h1>Specialities</h1>
              </div>
              </NavLink>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
