import { Close } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";


const Experience = () => {
  const user = useState("")
  const [edit, setEdit] = useState(false);
  const [licenceNumber, setLicenceNumber] = useState("");
  const [licenceErr, setLicenceErr] = useState(false);
  const [speciality, setSpeciality] = useState();
  const [specialities, setSpecialities] = useState([{ Id: "", name: "" }]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const status = useState("")
  const [experience, setExperience] = useState(null);



  const setExperienceData = () => {
    user?.experience?.length
      ? setExperience(
          user.experience.map((item) => ({
            position: item.position,
            hospitalName: item.hospitalName,
            startDate: dayjs(`${item.fromYear}-${item.fromMonth}-1`),
            endDate: dayjs(`${item.toYear}-${item.toMonth}-1`),
          }))
        )
      : setExperience(null);
  };

  async function getSpecialitiesdata() {
    const speciality = await getSpecialities();
    console.log(speciality);
    setSpeciality(speciality);
  }

  const isValidLicenceNumber = (e) => {
    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length > 3) {
      setLicenceErr(false);
    } else {
      setLicenceErr("Please enter the valid licence number");
    }
  };

  const isValidPosition = (e, index) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z]*$/.test(e.target.value)) {
      err = "Please enter the valid position";
    }
    if (experience) {
      const itemData = { ...experience[index], positionErr: err };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };

  const isValidHospital = (e, index) => {
    let err = "";
    if (e.target.value.length < 3 || !/^[a-zA-Z\s]*$/.test(e.target.value)) {
      err = "Please enter the valid hospital Name";
    }
    if (experience) {
      const itemData = { ...experience[index], hospitalErr: err };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };

  const handleSubmit = async () => {
   
      setEdit(true);
      
  };

  const disabledSubmit = () => {
    let disabled = false;
    
    return disabled;
  };

  const setStartDate = (start, end, index) => {
    let starterr = "";
    let enderr = "";
    if (!isValidDate(start, end)) {
      starterr = "Start Date must be less than end Date";
      enderr = "End Date must be greater than start Date";
    }
    if (experience) {
      const itemData = {
        ...experience[index],
        startErr: starterr,
        endErr: enderr,
        startDate: start,
      };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };

  const setEndDate = (start, end, index) => {
    let starterr = "";
    let enderr = "";
    if (!isValidDate(start, end)) {
      starterr = "Start Date must be less than end Date";
      enderr = "End Date must be greater than start Date";
    }
    if (experience) {
      const itemData = {
        ...experience[index],
        startErr: starterr,
        endErr: enderr,
        endDate: end,
      };
      setExperience([
        ...experience.slice(0, index),
        itemData,
        ...experience.slice(index + 1),
      ]);
    }
  };

  const isValidDate = (startDate, endDate) => {
    const startYear = startDate.get("year");
    const endYear = endDate.get("year");
    if (endYear >= startYear) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setExperienceData();
    setEdit(false);
  };

  return (
    <div>
        <div className="bg-gray-50  h-[700px]" >
        <Header/>
        <Sidebar/>
        
            <Grid container sx={{mt:"30px", ml:"270px"}}>

      {user && (
        <Grid container>
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              My Experience
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3f51b5",
                display: edit ? "inline" : "none",
                mr: 1,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={edit && disabledSubmit()}
              onClick={handleSubmit}
              sx={{ backgroundColor: "#3f51b5" }}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              border: 1,
              borderColor: "divider",
              mt: 2,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid item xs={5} sx={{ p: 2 }}>
              <TextField
                id="outlined-basic"
                label="Licence Number"
                variant="outlined"
                required
                onBlur={isValidLicenceNumber}
                helperText={licenceErr}
                error={Boolean(licenceErr)}
                value={licenceNumber}
                onChange={(e) => setLicenceNumber(e.target.value)}
                disabled={!edit}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              {speciality && (
                <Autocomplete
                  multiple
                  disabled={!edit}
                  id="tags-outlined"
                  sx={{ p: 2 }}
                  options={speciality}
                  value={specialities}
                  onChange={(event, value) => {
                    setSpecialities(
                      value.map((speciality) => ({
                        name: speciality.name,
                        Id: speciality.Id,
                      }))
                    );
                  }}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField {...params} required label="Speciality(ies)" />
                  )}
                />
              )}
            </Grid>
          </Grid>
          {experience &&
            experience.map((item, index) => {
              return (
                <>
                  <Grid item xs={12} sx={{ textAlign: "right" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setExperience([
                          ...experience.slice(0, index),
                          ...experience.slice(index + 1),
                        ]);
                      }}
                      disabled={!edit}
                    >
                      <Close sx={{ color: "grey" }} />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      backgroundColor: "white",
                      border: 1,
                      borderColor: "divider",

                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid item xs={10} sx={{ p: 2 }}>
                        <TextField
                          id="outlined-basic"
                          label="Position"
                          variant="outlined"
                          onBlur={(e) => isValidPosition(e, index)}
                          helperText={item.positionErr}
                          error={Boolean(item.positionErr)}
                          value={item.position}
                          onChange={(e) => {
                            const itemData = {
                              ...item,
                              position: e.target.value,
                            };
                            setExperience([
                              ...experience.slice(0, index),
                              itemData,
                              ...experience.slice(index + 1),
                            ]);
                          }}
                          disabled={!edit}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={10} sx={{ p: 2 }}>
                        <TextField
                          id="outlined-basic"
                          label="Hospital"
                          variant="outlined"
                          onBlur={(e) => isValidHospital(e, index)}
                          helperText={item.hospitalErr}
                          error={Boolean(item.hospitalErr)}
                          value={item.hospitalName}
                          onChange={(e) => {
                            const itemData = {
                              ...item,
                              hospitalName: e.target.value,
                            };
                            setExperience([
                              ...experience.slice(0, index),
                              itemData,
                              ...experience.slice(index + 1),
                            ]);
                          }}
                          disabled={!edit}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid item xs={8} sx={{ p: 2, mb: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            disableFuture
                            views={["year", "month"]}
                            value={item.startDate}
                            disabled={!edit}
                            slotProps={{
                              textField: {
                                helperText: item.startErr,
                                error: Boolean(item.startErr),
                              },
                            }}
                            onChange={(value) => {
                              if (value) {
                                setStartDate(value, item.endDate, index);
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={8} sx={{ p: 2, mb: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="End Date"
                            disableFuture
                            views={["year", "month"]}
                            value={item.endDate}
                            disabled={!edit}
                            slotProps={{
                              textField: {
                                helperText: item.endErr,
                                error: Boolean(item.startErr),
                              },
                            }}
                            onChange={(value) => {
                              if (value) {
                                setEndDate(item.startDate, value, index);
                              }
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          <Grid
            item
            xs={2}
            sx={{
              ml: "auto",
              textAlign: "right",
              mt: 3,
              display: edit ? "block" : "none",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3f51b5" }}
              onClick={() => {
                if (experience) {
                  setExperience([
                    ...experience,
                    {
                      position: "",
                      hospitalName: "",
                      startDate: dayjs(new Date()),
                      endDate: dayjs(new Date()),
                      positionErr: "",
                      hospitalErr: "",
                      startErr: "",
                      endErr: "",
                    },
                  ]);
                }
              }}
            >
              Add Row
            </Button>
          </Grid>
        </Grid>
      )}
      </Grid>
      </div>
    </div>
  );
};

export default Experience;
