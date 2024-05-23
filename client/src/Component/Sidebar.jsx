import React, { useState, useEffect } from "react";
import { IoMdPerson } from "react-icons/io";
import { RiBubbleChartFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { NavLink, useLocation } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = () => {
  const { role } = useSelector((state) => state.user);
  const location = useLocation();
  const [patientProf, setPatientProf] = useState(false);

  useEffect(() => {
    if (location.pathname === "/patientprofile" || location.pathname === "/changePassword") {
      setPatientProf(true);
    }
  }, [location.pathname]);

  const handleToggle = () => {
    setPatientProf(!patientProf);
  }

  return (
    <>
      {role === "doctor" ? (
        <div className="fixed top-[130px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <>
              <div className="flex bg-gray-200 h-11 hover:bg-gray-200 p-2 gap-5">
                <DashboardIcon className="text-lg ml-4 text-gray-600" />
                <h1 className="ml-2">Dashboard</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                <PersonIcon className="ml-4 text-lg text-gray-600" />
                <h1>Doctor Profile</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                <EventNoteIcon className="ml-4 text-lg text-gray-600" />
                <h1>Appointments</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                <ReviewsIcon className="ml-4 text-lg text-gray-600" />
                <h1>Reviews</h1>
              </div>
            </>
          </div>
        </div>
      ) : role === "patient" ? (
        <div className="fixed top-[130px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <>
              <div className="flex bg-gray-200 h-12 hover:bg-gray-200 p-2 gap-5">
                <IoMdPerson className="text-lg ml-4 text-gray-600" />
                <h1 className="ml-2">Doctors</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                <RiBubbleChartFill className="ml-4 text-lg text-gray-600" />
                <h1>Specialities</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                <EventNoteIcon className="ml-4 text-lg text-gray-600" />
                <h1>My Appointments</h1>
              </div>
              <NavLink to={'/patientprofile'} onClick={handleToggle}>
                <div className="flex hover:bg-gray-200 h-12 p-2 gap-5">
                  <PersonIcon className="ml-4 text-lg text-gray-600" />
                  <h1>Account Settings</h1>
                </div>
              </NavLink>
              {
                patientProf && (
                  <>
                    <NavLink to={'/patientprofile'}>
                      <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-12">
                        <AccountCircleOutlinedIcon className="ml-4 text-lg text-gray-60" />
                        <h1>My Profile</h1>
                      </div>
                    </NavLink>
                    <NavLink to={'/changePassword'}>
                      <div className="flex pl-16 gap-6 hover:bg-gray-200 p-2 h-13">
                        <LockOutlinedIcon className="ml-4 text-lg text-gray-600" />
                        <h1>Change Password</h1>
                      </div>
                    </NavLink>
                  </>
                )
              }
            </>
          </div>
        </div>
      ) : (
        <div className="fixed top-[130px] left-0 bottom-[1px] z-10 w-[250px] border-r-2 bg-white hidden lg:block ">
          <div className="pt-2 flex flex-col gap-5">
            <>
              <div className="flex bg-gray-200 hover:bg-gray-200 p-2 gap-5">
                <PersonIcon className="ml-4 text-lg text-gray-600" />
                <h1>Doctors</h1>
              </div>
              <div className="flex hover:bg-gray-200 h-11 p-2 gap-5">
                <RiBubbleChartFill className="ml-4 text-lg text-gray-600" />
                <h1>Specialities</h1>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
