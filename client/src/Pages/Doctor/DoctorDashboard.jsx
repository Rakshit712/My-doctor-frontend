import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Chart1 from "../../Component/ui/Chart1";
import Chart2 from "../../Component/ui/Chart2";
import Chart3 from "../../Component/ui/Chart3";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

import Calendar from "react-calendar";
import Footer from "../../Component/Footer";

function DoctorDashboard() {
  const [date, setDate] = useState(new Date());
  const [startErr, setStartErr] = useState("");
  const [startTime, setStartTime] = useState("11:00");
  const [slots, setSlots] = useState([]);
  const [size, setSize] = useState("2");
  const isStartError = (value) => {
    if (validTime(value)) {
      setStartErr("");
    } else {
      setStartErr("Past time selected. Please select a time in the future.");
    }
  };

  const validTime = (value) => {
    const startSplitTime = startTime.split(":");
    if (Number(startSplitTime[0]) > new Date().getHours()) {
      return true;
    } else {
      return false;
    }
  };

  const getEndTime = () => {
    const endTime = new Date();
    const startSplitTime = startTime.split(":");
    endTime.setHours(Number(startSplitTime[0]));
    endTime.setMinutes(Number(startSplitTime[1]) + 30);
    return moment(endTime).format("HH:mm");
  };

  return (
    <>
      <div className="bg-gray-50">
        <Header/>
        <Sidebar />
        <div className="ml-[270px] min-h-screen mt-3">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: "white", p: 2 }}>
                <Typography sx={{ fontSize: 17, mb: 1 }}>
                  Completed Appointments
                </Typography>
                <hr />
                <Chart1 />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: "white", p: 2 }}>
                <Typography sx={{ fontSize: 17, mb: 1 }}>
                  Cancelled Appointments
                </Typography>
                <hr />
                <Chart2 />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: "white", p: 2, mr:1 }}>
                <Typography sx={{ fontSize: 17, mb: 1 }}>
                  Total Appointments
                </Typography>
                <hr />
                <Chart3 />
              </Box>
            </Grid>
            <Grid
              container
              sx={{ backgroundColor: "white", ml: 3, mt: 2, p: 6 }}
            >
              <Grid item xs={12} sx={{ mx: 2, my: 1 }}>
                <Typography>Slots</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ borderTop:2 ,mb:2, borderColor: "divider" }}
              ></Grid>
              <Grid item xs={12} md={5} lg={3} sx={{ mt: 1 }}>
                <Calendar
                  value={date}
                  onChange={setDate}
                  minDate={new Date()}
                ></Calendar>
              </Grid>
              <Grid item xs={12} md={5} lg={3} sx={{ ml: 2, mt: 2 }}>
                <TextField
                  error={Boolean(startErr)}
                  type="time"
                  label="Start Time"
                  fullWidth
                  value={startTime}
                  sx={{ mt: 2,ml:2 }}
                  onChange={(e) => setStartTime(e.target.value)}
                  onBlur={(e) => isStartError(e.target.value)}
                  helperText={startErr}
                />
                <TextField
                  type="time"
                  label="End Time"
                  fullWidth
                  value={getEndTime()}
                  sx={{ mt: 2,ml:2 }}
                  disabled
                />
                <FormControl fullWidth sx={{ mt: 2 ,ml:2}}>
                  <InputLabel id="demo-simple-select-label">
                    Appointment Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Appointment Size"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Typography sx={{ mt: 2, fontSize: 12, color: "grey" }}>
                  Slot duration: 30 minutes
                </Typography>

                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#3f51b5", px: 4 }}
                    disabled={!validTime(startTime)}
                  >
                    Create <br></br>Slot
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {!slots.length ? (
                  <Typography
                    sx={{ textAlign: "center", fontSize: 18, mt: 12, ml: 15 }}
                  >
                    No slot present on selected date
                  </Typography>
                ) : (
                  slots.map((item) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: 1,
                        borderColor: "silver",
                        mt: 2,
                        width: { xs: "400px", lg: "250px" },
                        height: "80px",
                        ml: 5,
                        p: 1,
                      }}
                    >
                      <Box>
                        <Typography>
                          {getTime(item.startTime)} - {getTime(item.endTime)}
                        </Typography>

                        <Typography>
                          Slot size:{item.size} Booked:{item.count}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => deleteSlots(item.Id)}>
                        <Close />
                      </IconButton>
                    </Box>
                  ))
                )}
              </Grid>
            </Grid>

            <Grid
              container
              sx={{ backgroundColor: "white", p: 8, ml: 3, mt: 2,  mr: 2 }}
            >
              <Grid item xs={6} sx={{ my: "auto", p: 5 }}>
                <Typography sx={{ fontSize: 20 }}>
                  No completed appointment so far
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ my: "auto", p: 8 }}>
                <Typography sx={{ fontSize: 20 }}>
                  No upcoming appointment so far
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                mt: 5,
                ml:3
              }}
            >
              <Grid item xs={3} sx={{ my: "auto", p: 8 }}>
                <Typography sx={{ fontSize: 20 }}>No review so far</Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ marginRight: 12, backgroundColor: "white", p: 5 }}
              >
                <Typography
                  sx={{
                    fontSize: 52,
                    textAlign: "center",
                    p: 5 - 40,
                    color: "#3f51b5",
                  }}
                >
                  3.5
                </Typography>
                <Rating sx={{ml:7}} name="size-medium" defaultValue={3

                } />

                <Typography
                  sx={{ fontSize: 14, textAlign: "center", p: 5 - 40 }}
                >
                  5 ratings
                </Typography>
                <Stack spacing={2} sx={{ flex: 1 ,mb:3 }}>
                
                  <LinearProgress determinate value={50} />
                  <LinearProgress determinate value={50} />
                  <LinearProgress determinate value={75} />
                  <LinearProgress determinate value={100} />
                  <LinearProgress determinate value={100} />
                 
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default DoctorDashboard;
