import React, { useState } from "react";
import Header from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import Footer from "../Component/Footer";
import SpecialityCard from "../Component/SpecialityCard";
import { Search } from "@mui/icons-material";

function SpecialityPage() {
  const searchSpeciality = async () => {
    console.log("speciality");
  };
  const [speciality, setSpeciality] = useState([
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    {
      name: "Gastroenterology ",
      imageUrl:
        "https://my-doctors.net/assests/images/specialities/g/gastroenterology.svg",
    },
    {
      name: "Child & Adolescent Psychiatry",
      imageUrl:
      "https://my-doctors.net/assests/images/specialities/c/child%20&%20adolescent%20psychiatry.svg",
    },
    
  ]);
  const [value, setValue] = useState(16);
  let specialityGrid;
  if (speciality) {
    if (speciality.length) {
      specialityGrid = speciality.map((item, index) => {
        return (
          <Grid item key={index} xs={4} sx={{ width:"auto" }}>
            <SpecialityCard name={item.name} imageUrl={item.imageUrl} />
          </Grid>
        );
      });
    } else {
      specialityGrid = (
        <div style={{ textAlign: "center", width: "100%", marginTop: "10px" }}>
          No specialities found
        </div>
      );
    }
  } else {
    specialityGrid = (
      <ClipLoader
        loading={loading}
        size={50}
        color="blue"
        cssOverride={{ margin: "auto" }}
      />
    );
  }

  return (
    <>
      <div className="bg-gray-50 ">
        <Header />
<Sidebar/>
        <Grid
          conatiner
          spacing={1}
          sx={{
            display:"flex",
            pl: 3,
            ml: "250px",
            mr:2,
            mt: 2,
            mb: 1,
            justifyContent: "space-between",
          }}
        >
          {speciality && (
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                component="div"
                color="#3f51b5"
                fontWeight="Bold"
                sx={{mt:2}}
              >
                {speciality.length > 15
                  ? speciality.length - (speciality.length % 10)
                  : speciality.length}
                + Specialities
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} md={3} sx={{ display: "flex", mt: 1 }}>
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchSpeciality();
                }
              }}
              variant="outlined"
              placeholder="Search Specialities"
              
            />
          

            <Select
              sx={{ ml: 1 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={(e) => {
                setValue(Number(e.target.value));
              }}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </Grid>
        </Grid>
          <Grid container xs={10} sx={{ ml:"250px",pl:2}}>
          {specialityGrid}
        </Grid>
      </div>
      <Footer />
    </> 
  );
}

export default SpecialityPage;
