import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";
import Footer from "../../Component/Footer";

function Profile() {
  const [img, setImg] = useState("/broken-image.jpg");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [dob, setDob] = useState(dayjs());

  const disabled = img === "/broken-image.jpg" ||
  !bloodGroup ||
  !houseNo ||
  !colony ||
  !city ||
  !state ||
  !country ||
  !pinCode;

  return (<>
    <div className="bg-gray-50" >
      <Header />
      
      <Sidebar/>

      <Container  >
        <Grid sx={{ marginTop: "50px", marginLeft: "100px" }} container spacing={0}>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ color: "#3f51b5", fontWeight: "bold" }}
            >
              My Profile
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ mt: 2 }}>
            <Avatar src={img} sx={{ height: 120, width: 120 }} />
            <Box sx={{ display: edit ? "flex" : "none" }}>
              <Button component="label">
                <CameraAlt />
                <input
                  type="file"
                  hidden
                  name="Image"
                  accept=".jpg, .jpeg, .png"
                />
              </Button>
              <Close />
            </Box>
            <Typography sx={{ fontSize: 11, color: "grey", mt: 2 }}>
              JPEG, JPG or PNG image less than 1 MB
              <br />
              (Close up face picture looks great)
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              disabled={edit && disabled}
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={() => setEdit(!edit)}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>

         
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-phone"
              label="Phone Number"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-email"
              label="Email"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>

          
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                label="Gender"
                disabled={!edit}
                fullWidth
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Of Birth"
                value={dob}
                onChange={(newValue) => setDob(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
                disabled={!edit}
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="blood-group-label">Blood Group</InputLabel>
              <Select
                labelId="blood-group-label"
                id="blood-group"
                label="Blood Group"
                disabled={!edit}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
            </FormControl>
          </Grid>

         
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="House No./Street/Area"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Colony/Street/Locality"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, mb:2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, mb:2,p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2, mb:2, p: 1 }}>
            <TextField
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
              disabled={!edit}
              fullWidth
            />
          </Grid>
        </Grid>
      </Container>

    </div>
    <Footer/>
    </>
  );
}

export default Profile;
