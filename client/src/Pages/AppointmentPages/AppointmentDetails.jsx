import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function AppointmentDetails({ next, back }) {
  const appointmentData = useSelector((state) => state.slot.data);

  const getSlotTime = (slot) => {
    const start = moment(slot.startTime).format("hh:mm a");
    const end = moment(slot.endTime).format("hh:mm a");
    return `${start} - ${end}`;
  };

  const data = localStorage.getItem("data");
  const parsedData = JSON.parse(data);

  console.log(parsedData);
  const user = parsedData.user;

 // const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <>
      <Grid container>
        <Grid item xs={7} xl={6} sx={{ m: "auto" }}>
          <Typography variant="h4">Appointment Details</Typography>
          <Box
            sx={{ mt: 2, border: 1, borderColor: "silver", p: 2, height: 370 }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>Patient's name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  {appointmentData?.otherName
                    ? appointmentData.otherName
                    : `${user?.name}`}
                </Typography>
              </Grid>
            </Grid>

            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  Patient's contact number
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  {appointmentData?.otherMobileNumber
                    ? appointmentData.otherMobileNumber
                    : user?.contactNo}
                </Typography>
              </Grid>
            </Grid>

            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>Consultation fee</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  Rs {appointmentData?.doctor.profile.consultationFee}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>Doctor's name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  Dr. {appointmentData?.doctor?.name}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>Appointment date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  {moment(appointmentData?.slots?.startTime).format(
                    "dddd, D MMM, YYYY"
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>Appointment time</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 18 }}>
                  {appointmentData?.slots && getSlotTime(appointmentData.slots)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={back}
                sx={{ color: "black", borderColor: "silver" }}
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#3f51b5" }}
                onClick={next}
              >
                Confirm and proceed
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AppointmentDetails;
