import React, { useEffect, useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor, getSlotsForDoctor } from "../../store/doctorSlice";
import styled from "@emotion/styled";
import Footer from "../../Component/Footer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Rating,
  IconButton,
  Tab,
  Typography,
  Button,
  Tabs,
} from "@mui/material";
import { ExpandMore, Favorite, Share, Star } from "@mui/icons-material";
import moment from "moment";
import { setAppointmentData } from "../../store/slotSlice";
function DoctorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const [hover, setHover] = useState(-1);
  const [ratingValue, setRatingValue] = useState(2);
  const {
    user: doctor,
    loading,
    error,
    slot,
  } = useSelector((state) => state.doctor);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getDoctor(id));
    dispatch(getSlotsForDoctor(id));
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const bookSlots = (slots) => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
    } else {
      console.log( slots, doctor )
      dispatch(setAppointmentData({ slots, doctor }));
      navigate("/bookAppointment");
    }
  };

  const labels = {
    1: "Very sad",
    2: "Sad",
    3: "Neutral",
    4: "Happy",
    5: "Very Happy",
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#3f51b5",
    },
    "& .MuiRating-iconHover": {
      color: "#3f51b5",
    },
  });

  const getDate = (startDate) => {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const handleExpandedChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const getSlotTime = (slot) => {
    const start = moment(slot.startTime).format("hh:mm a");
    const end = moment(slot.endTime).format("hh:mm a");
    return `${start}-${end}`;
  };

  function groupSlotsByDate() {
    const group = {};
    if (slot && slot.length > 0) {
      slot.map((slot) => {
        const slotDate = getDate(slot.startTime);
        if (!group[slotDate]) {
          group[slotDate] = [];
        }
        group[slotDate].push(slot);
      });
    }
    console.log(group);
    return group;
  }

  const groupedSlots = groupSlotsByDate();

  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <Sidebar />

        <div className="ml-[270px] min-h-screen">
          {doctor && (
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={4} sx={{ mr: 3 }}>
                <Card sx={{ width: "100%" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ backgroundColor: "red", height: 50, width: 50 }}
                      >
                        <img alt={`${doctor.name}`} />
                      </Avatar>
                    }
                    title={`Dr. ${doctor.name}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.profile.bio
                        ? doctor.profile.bio
                        : "Bio not available"}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                      <Share />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={4}>
                {console.log(slot)}
                {!slot || slot.length < 0 ? (
                  <Typography sx={{ fontSize: 18, ml: 5 }}>
                    No slot available
                  </Typography>
                ) : (
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tabValue}
                      onChange={handleChange} 
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      {Object.keys(groupedSlots).map((slot, index) => {
                        return (
                          <Tab
                            key={index}
                            label={moment(slot).format("MMM D, YYYY")}
                            id={`simple-tab-${index}`}
                            aria-controls={`simple-tabpanel-${index}`}
                          />
                        );
                      })}
                    </Tabs>
                  </AppBar>
                )}
                {slot &&
                  Object.keys(groupedSlots).map((slot, index) => (
                    <TabPanel value={tabValue} index={index} key={index}>
                      <Box sx={{ backgroundColor: "white", p: 1 }}>
                        {groupedSlots[slot].map((slotData, slotIndex) => (
                          <Chip
                            label={`${getSlotTime(slotData)}`}
                            variant="outlined"
                            color="primary"
                            sx={{ m: 2, fontSize:16 }}
                            onClick={() => bookSlots(slotData)}
                            key={slotIndex}
                          />
                        ))}
                      </Box>
                    </TabPanel>
                  ))}

                {showLoginMessage && (
                  <Box>
                    <Typography sx={{ fontSize: 18, color: "red" }}>
                      Please
                      <Link to="/login" style={{ textDecoration: "none", color:"blue" }}>
                        {" "}
                        Sign in{" "}
                      </Link>
                      /{" "}
                      <Link
                        to="/patientRegister"
                        style={{ textDecoration: "none" , color:"blue"  }}
                      >
                        Register{" "}
                      </Link>{" "}
                      to book an appointment.
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ backgroundColor: "white", mt: 3, mx: 3 }}
              >
                <div className="bg-white, p-3">
                  <div>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: "bold", marginBottom: 3 }}
                    >
                      Consultation Fee : Rs.{" "}
                      {doctor.profile.consultationFee
                        ? doctor.profile.consultationFee
                        : "Not available"}
                    </Typography>
                  </div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleExpandedChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        Specialities
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {doctor.profile.specialities.length ? (
                        <ul>
                          {doctor.profile.specialities.map((speciality) => (
                            <li
                              style={{
                                marginBottom: 1,
                                fontSize: 18,
                                marginLeft: 24,
                              }}
                            >
                              {speciality.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography sx={{ fontSize: 14 }}>
                          No specialities available
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleExpandedChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          flexShrink: 0,
                          fontWeight: "bold",

                          fontSize: 18,
                        }}
                      >
                        Qualifications
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {doctor.profile.qualification ? (
                        <ul>
                          {doctor.profile.qualification.map((qual) => (
                            <li
                              style={{
                                marginBottom: 1,
                                fontSize: 18,
                                marginLeft: 24,
                                marginY: 4,
                              }}
                            >
                              {qual.certification}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography sx={{ fontSize: 14 }}>
                          No qualifications available
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleExpandedChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          flexShrink: 0,
                          fontWeight: "bold",

                          fontSize: 18,
                        }}
                      >
                        Experience
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {doctor.profile.experience ? (
                        <ul>
                          {doctor.profile.experience.map((item) => (
                            <li
                              style={{
                                marginBottom: 1,
                                fontSize: 18,
                                marginLeft: 24,
                                marginY: 4,
                              }}
                            >
                              {item.position} at {item.place}({item.fromYear}-
                              {item.toYear})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography sx={{ fontSize: 14 }}>
                          No experience
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleExpandedChange("panel5")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel5bh-content"
                      id="panel5bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          flexShrink: 0,
                          fontWeight: "bold",

                          fontSize: 18,
                        }}
                      >
                        Languages
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {doctor.profile.languages ? (
                        <ul>
                          {doctor.profile.languages.map((language) => (
                            <li
                              style={{
                                marginBottom: 1,
                                fontSize: 18,
                                marginY: 4,
                                marginLeft: 24,
                              }}
                            >
                              {language}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography sx={{ fontSize: 14 }}>
                          No language available
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleExpandedChange("panel6")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel6bh-content"
                      id="panel6bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          flexShrink: 0,
                          fontWeight: "bold",

                          fontSize: 18,
                        }}
                      >
                        Reviews
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        sx={{ fontSize: 18, marginLeft: 24, marginY: 4 }}
                      >
                        No reviews available
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel7"}
                    onChange={handleExpandedChange("panel7")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel7bh-content"
                      id="panel7bh-header"
                    >
                      <Typography
                        sx={{
                          mx: 3,
                          width: "33%",
                          flexShrink: 0,
                          fontWeight: "bold",

                          fontSize: 18,
                        }}
                      >
                        Write a review
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component="legend" sx={{ fontSize: 18 }}>
                        Rating
                      </Typography>
                      <Box
                        sx={{
                          width: 300,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <StyledRating
                          name="hover-feedback"
                          value={ratingValue}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setRatingValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <Star
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {ratingValue !== null && (
                          <Box sx={{ ml: 2, fontSize: 18 }}>
                            {labels[hover !== -1 ? hover : ratingValue]}
                          </Box>
                        )}
                      </Box>
                      <form style={{ marginTop: 30, fontSize: 18 }}>
                        <input
                          type="text"
                          placeholder="Write a Review"
                          style={{
                            border: "1px solid grey",
                            borderRadius: 10,
                            padding: "40px 15px",
                            width: "70%",
                          }}
                        />
                        <br />
                        <Button
                          variant="outlined"
                          sx={{
                            mt: 4,
                            borderRadius: 7,
                            px: 6,
                          }}
                        >
                          Submit
                        </Button>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          )}
        </div>
        <Footer/>
      </div>
  
    </>
  );
}

export default DoctorPage;
