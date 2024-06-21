import { Box, Step, StepButton, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PatientDetails from "./PatientDetails";
import AppointmentDetails from "./AppointmentDetails";
import PaymentDetails from "./PaymentDetails";
import { useNavigate } from "react-router-dom";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";

function BookAppoinment() {
  const steps = ["Patient Details", "Appointment Details", "Payment Details"];
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const appointmentData = useSelector((state) => state.slot.data);
  console.log(appointmentData)

  useEffect(() => {
    if (!appointmentData) navigate("/");
  }, [appointmentData, navigate]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepData = (step) => {
    switch (step) {
      case 0:
        return <PatientDetails next={handleNext} />;
      case 1:
        return <AppointmentDetails back={handleBack} next={handleNext} />;
      case 2:
        return <PaymentDetails back={handleBack} next={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="ml-[270px] min-h-screen mt-3">
      <Box sx={{ width: "100%", backgroundColor: "white", p: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      {getStepData(activeStep)}
      </div>
    </>
  );
}

export default BookAppoinment;
