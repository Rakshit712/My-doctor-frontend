import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Footer from "../../Component/Footer";

function PatientAppointment() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <>
      <div className="bg-gray-50  h-[700px]">
        <Header />
        <Sidebar />
        <div className="ml-[270px] my-5">
          <Grid item xs={12} >
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Grid >
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ color: "#3f51b5", fontWeight: "bold", fontSize: 28 }}
              >
                My Appointments
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "grey", fontSize: 15, mr: 3 }}>
                  Number of records
                </Typography>
                <FormControl
                  sx={{ mr: 3, my: 2, minWidth: 50 }}
                  variant="standard"
                >
                  <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </Box>
             
            </Grid>
            <Grid item xs={12} sx={{ backgroundColor: "white", mt:2, mr:2 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    color: "grey",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  No appointments are made yet
                </Typography>
              </Grid>
          </Grid>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default PatientAppointment;
