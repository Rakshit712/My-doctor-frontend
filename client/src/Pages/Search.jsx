import React, { useEffect, useState } from "react";
import Header from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { Box, Grid, Typography } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../Component/DoctorCard";
import axios from "axios";


function Search() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const speciality = searchParams.get("sp");
  const name = searchParams.get("q");

  useEffect(() => {
    console.log(`Speciality: ${speciality}, Name: ${name}`);
    getDoctorsData();
  }, [speciality, name]);

  const getDoctorsData = async () => {
    setLoading(true);
    try {
      let resp;

      const isValidSpeciality = speciality && speciality !== "null" && speciality.trim().length > 0;
      const isValidName = name && name !== "null" && name.trim().length > 0;

     
      if (isValidSpeciality && isValidName) {
        
        resp = await axios.get(`https://my-doctors-app.onrender.com/api/doctors/filter?speciality=${speciality}&name=${name}`);
       // resp = await axios.get(`http://localhost:8000/api/doctors/filter?speciality=${speciality}&name=${name}`);
      } else if (isValidSpeciality) {
   
        resp = await axios.get(`https://my-doctors-app.onrender.com/api/doctors/filter?speciality=${speciality}`);
       // resp = await axios.get(`http://localhost:8000/api/doctors/filter?speciality=${speciality}`);
      } else if (isValidName) {

        resp = await axios.get(`https://my-doctors-app.onrender.com/api/doctors/filter?name=${name}`);
       // resp = await axios.get(`http://localhost:8000/api/doctors/filter?name=${name}`);
      } else {
    
        setDoctors(null);
        return;
      }

      if (resp && resp.data && resp.data.data) {
     
        setDoctors(resp.data.data);
      } else {
        setDoctors(null);
      }
    } catch (error) {

      setDoctors(null); 
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <Sidebar />
        <div className="ml-[270px] mt-2">
          {loading ? (
            <Box sx={{ mt: 2, display: "flex" }}>
              <ClipLoader
                loading={loading}
                size={22}
                color="#3f51b5"
                cssOverride={{ marginLeft: 2 }}
              />
              <Typography sx={{ ml: 2 }}>
                Searching For: '{speciality && name}'
              </Typography>
            </Box>
          ) : !doctors || doctors.length === 0 ? (
            <Typography sx={{ ml: 1, mt: 2, color: "grey" }}>
              No results found for '{speciality && name}'
            </Typography>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontSize: 18, mb: 1 }}>
                    Showing results for: '{speciality || name}'
                  </Typography>
                  <Typography sx={{ color: "grey", mb: 1 }}>
                    {doctors.length} doctors found
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {doctors.map((doctor, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={8}
                    md={4}
                    xl={4}
                  >
                    <DoctorCard
                      _id={doctor._id}
                      name={doctor.name}
                      Qualification={doctor.profile.qualification}
                      specialities={doctor.profile.specialities}
                      hospitals={doctor.profile.hospitals}
                      languages={doctor.profile.languages}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
  
      </div>
    
    </>
  );
}

export default Search;
