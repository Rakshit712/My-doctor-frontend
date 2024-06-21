import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import {
  getDoctorSpecialities,
  getLanguages,
  getQualification,
  getNextAvailableSlots,
} from "../util/DoctorCardFunct";
import { NavLink } from "react-router-dom";

function DoctorCard({
  _id,
  name,
  Qualification,
  specialities,
  languages,
}) {
  const [nextAvailable, setNextAvailable] = useState(null);

  useEffect(() => {
    const fetchNextAvailableSlot = async () => {
      try {
        const nextSlot = await getNextAvailableSlots(_id);
        console.log(nextSlot);
        setNextAvailable(nextSlot);
      } catch (error) {
        console.error("Error fetching next available slot:", error);
        setNextAvailable("Not Available");
      }
    };

    fetchNextAvailableSlot();
  }, [_id]);

  return (
    <NavLink to="/doctor" state={_id}>
      <Card sx={{ width: { xs: 300, xl: 450 }, height: 460, mr: 5, p: 1 }}>
        <CardContent sx={{ display: "flex", height: "100%" }}>
          <Avatar src="/broken-image.jpg" sx={{ width: 90, height: 90, mr: 2 }} />
          <Box sx={{ height: "100%" }}>
            <Box sx={{ height: "85%" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>{`Dr. ${name}`}</Typography>
              <Typography sx={{ fontSize: 15, mt: 1, color: "gray" }}>
                {Qualification.length ? getQualification(Qualification) : "No qualifications available"}
              </Typography>
              <Typography sx={{ fontSize: 15, color: "grey" }}>
                {specialities.length ? getDoctorSpecialities(specialities) : "No specialities available"}
              </Typography>
              <Grid container>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 15, color: "black" }}>
                    Languages
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Typography sx={{ fontSize: 15, color: "grey" }}>
                    {languages.length ? getLanguages(languages) : "Not Available"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: 15, color: "black" }}>
                    Next Available
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ mt: 1 }}>
                  <Typography sx={{ fontSize: 15, color: "lightgreen" }}>
                    {nextAvailable}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Button variant="outlined" sx={{ mt: 1, borderRadius: 10 }}>
                Book Appointment
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </NavLink>
  );
}

export default DoctorCard;
