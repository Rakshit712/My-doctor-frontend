import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import {
  Autocomplete,
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
} from "@mui/material";


function DoctorProfile() {
  const [img, setImg] = useState("/broken-image.jpg");
  const [edit, setEdit] = useState(false);


  const handleSubmit = () => {
    setEdit(!edit);
  }

  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <Sidebar />
        <div className=" ml-[270px]">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="p-5">
              <Grid item sx={12}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  My Profile
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <Avatar
                  src={img}
                  sx={{ height: 110, width: 110, ml: 2, mt: 1 }}
                />

                <Box>
                  <Button
                    component="label"
                    variant="text"
                    disabled={!edit}
                    sx={{ mt: 1, ml: 3, textTransform: "none" }}
                  >
                    <Typography
                      sx={{
                        color: "#3f51b5",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      {edit ? "Upload_Profile" : "Change_Profile"}
                    </Typography>
                    <input
                      type="file"
                      hidden
                      name="Image"
                      accept=".jpg, .jpeg, .png"
                    ></input>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right", mr: 2 }}>
                <Button variant="contained" sx={{ backgroundColor: "#3f51b5" }} onClick={handleSubmit}>
                  {edit ? "Save" : "Edit"}
                </Button>
              </Grid>
              <Box sx={{  width: "98%" }}>
                <Grid
                  container
                  sx={{
                    backgroundColor: "white",
                    px: 1,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    mt: 1,
                    mb:2,
                  }}
                >
                  <Grid item xs={6} sx={{ mt: 2, p: 1 }}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ mt: 2, p: 1 }}>
                    <TextField
                      id="outlined-basic"
                      label="Consultation Fee"
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ mt: 2, p: 1, ml: "auto" }}>
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ mt: 2, p: 1 }}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ mt: 2, p: 1, ml: "auto" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={!edit}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                 
                  <Grid item xs={6} sx={{ mt: 2, p: 1 }}>
                    <TextField
                      id="outlined-basic"
                      label="Language "
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      required
                      id="outlined-multiline-static"
                      variant="outlined"
                      disabled={!edit}
                      label="Bio"
                      multiline
                      fullWidth
                      minRows={4}
                      sx={{ my: 2, p: 1 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;
