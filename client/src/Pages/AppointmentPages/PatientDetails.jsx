import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import Footer from "../../Component/Footer";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAppointmentData } from "../../store/slotSlice";

function PatientDetails({ next }) {
    const [forSelf, setForSelf] = useState(true);
    const [patientName, setPatientName] = useState("");
    const [patientMobileNumber, setPatientMobileNumber] = useState("");
    const [nameError, setNameError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const appointmentData = useSelector((state) => state.slot.data);
    const dispatch = useDispatch();


  return (
    <>
      <div>
      <Grid container>
        <Grid item xs={5} xl={6} sx={{ m: "auto" , bgcolor:"white"}}>
          <Typography variant="h4">Patient Details</Typography>
          <Box
            sx={{ mt: 2, border: 1, borderColor: "lightgray", p: 2, height: 370 }}
          >
           
            <FormControl>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ fontSize: 18, color: "black" }}
              >
                The appointment is for:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={forSelf ? "Myself" : "Someone Else"}
                onChange={() => setForSelf(!forSelf)}
              >
                <FormControlLabel
                  value="Myself"
                  control={<Radio />}
                  label="Myself"
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 18 } }}
                />
                <FormControlLabel
                  value="Someone Else"
                  control={<Radio />}
                  label="Someone Else"
                  sx={{ "& .MuiFormControlLabel-label": { fontSize: 18 } }}
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ mx: 2 }}>
              <Typography sx={{ fontSize: 18 }}>
                Please provide the following information about the patient:
              </Typography>
              <TextField
                variant="outlined"
                error={nameError}
                label="Patient Name"
                value={patientName}
                disabled={forSelf}
                fullWidth
                helperText={nameError && "Please enter a valid name!"}
                sx={{ mt: 3,fontSize: 18 }}
               
                onChange={(e) => setPatientName(e.target.value)}
              />
              <TextField
                variant="outlined"
                error={mobileError}
                label="Patient's Mobile number"
                value={patientMobileNumber}
                disabled={forSelf}
                fullWidth
                sx={{ mt: 3 ,fontSize: 18}}
                helperText={
                  mobileError && "Please enter a valid 10-digit mobile number!"
                }
                onKeyUp={() => {
                  if (
                    !/^[1-9][0-9]{9}$/.test(patientMobileNumber) ||
                    patientMobileNumber.length < 10
                  ) {
                    setMobileError(true);
                  } else {
                    setMobileError(false);
                  }
                }}
                onChange={(e) => setPatientMobileNumber(e.target.value)}
              />
              <Typography sx={{ fontSize: 17, mt: 2 }}>
                Fee : Rs{" "}
                {
                  appointmentData?.doctor.profile.consultationFee
                }
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <Button variant="outlined" fullWidth disabled>
                Back
              </Button>
            </Grid>
  
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#3f51b5" }}
                onClick={() => {
                  if (!forSelf) {
                    dispatch(
                      setAppointmentData({
                        ...appointmentData,
                        otherName: patientName,
                        otherMobileNumber: patientMobileNumber,
                      })
                    );
                  }
                  next();
                }}
                disabled={!forSelf && (!patientName || !patientMobileNumber)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          </Grid>
          </Grid>
      </div>
    </>
  );
}

export default PatientDetails;
