import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SwiperComponent from "./Swiper";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import UserIcon from "./ui/userIcon";
import AppointmentIcon from "./ui/AppointmentIcon";
import LogoutIcon from "./ui/LogoutIcon";
import { logout } from "../store/userSlice";
import {
  Autocomplete,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const buttons = [
  { text: "Dementia" },
  { text: "Depression" },
  { text: "Diabetes" },
  { text: "Diphtheria" },
  { text: "Dyslexia" },
  { text: "Obesity" },
  { text: "Vertigo" },
  { text: "Vaginitis" },
  { text: "Ulcers" },
  { text: "Typhoid" },
  { text: "Alcholism" },
  { text: "Gastroenterology" },
];

const Header = () => {
  const [searchSpeciality, setSearchSpeciality] = useState(null);
  const specialities = [
    "Gastroenterology",
    "Child & Adolescentc Psychiatry",
    "Endocrinology & Diabetology",
    "Bone Marrow",
    "Anesthesiology",
  ];
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    navigate(`/search?sp=${searchSpeciality}&q=${searchValue}`);
  };

  const handleNameSearch = () => {
    navigate(`/search?q=${searchValue}`);
  }
  const handleLogOut = () => {
    localStorage.removeItem("data");
    dispatch(logout());
    window.location.href = "/";
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      dispatch({ type: "user/setLoggedIn", payload: true });
      if (data.isDoctor !== undefined && data.isDoctor) {
        dispatch({ type: "user/setRole", payload: "doctor" });
      } else {
        dispatch({ type: "user/setRole", payload: "patient" });
      }
    }

    const handleOutsideClick = (event) => {
      if (!event.target.closest("#attendee-modal-content")) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [dispatch]);

  return (
    <>
      <div className="sticky top-0 bg-white overflow-hidden z-10">
        <header className="flex flex-col items-center sm:flex-row sm:items-center justify-between p-4 px-5">
          {/* Logo section */}
          <div className="hidden sm:flex items-center mb-4 sm:mb-0">
            <NavLink to={"/"}>
              <img
                src="https://my-doctors.net/logo.svg"
                alt="My Doctors Logo"
                className="h-10"
              />
            </NavLink>
          </div>

          {/* Mobile view */}
          <div className="flex flex-row items-center justify-between w-full sm:hidden bg-white">
            {/* Mobile menu button */}
            <button>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/* Logo in mobile view */}
            <div className="sm:hidden">
              <img
                src="https://my-doctors.net/logo.svg"
                alt="My Doctors Logo"
                className="h-8"
              />
            </div>
          </div>

          {/* Search section */}
          <div className="flex justify-center sm:w-auto bg-gray-100">
            <Grid
              item
              xs={12}
              lg={4}
              order={{ xs: 4, lg: 3 }}
              sx={{
                backgroundColor: "#fafafa",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Autocomplete
                aria-label="Select a service"
                freeSolo
                id="tags-outlined"
                options={specialities.map((option) => option)}
                sx={{ width: 250, border: "none" }}
                value={
                  window.location.pathname === "/search" ? searchSpeciality : ""
                }
                onChange={(event, value) => {
                  setSearchSpeciality(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select a Service"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                      
                      
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                )}
              />
          
              <TextField
                variant="standard"
                placeholder="Search Doctors"
                autoComplete="off"
                InputProps={{
                  
                  disableUnderline: true,
                }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                
                sx={{ p: 1 }}
              />
              <IconButton onClick={handleSearch}>
                            <Search />
                          </IconButton>
            </Grid>
          </div>
          {isLoggedIn ? (
            <button onClick={() => setIsOpen(!isOpen)}>
              <Avatar src="/broken-image.jpg" />
              {isOpen && (
                <dialog
                  open={isOpen}
                  className="fixed top-[60px] md:top-[60px] left-[280px] md:left-[1280px] bg-white p-2 rounded-md border z-10"
                >
                  <div
                    id="attendee-modal-content"
                    className="flex flex-col gap-1"
                  >
                    <List className="w-[220px]">
                      <NavLink to={"/patientprofile"}>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <UserIcon />
                            <ListItemText primary="Account Setting" />
                          </ListItemButton>
                        </ListItem>
                      </NavLink>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <AppointmentIcon />
                          <ListItemText primary="My Appointments" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            handleLogOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogoutIcon />
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </dialog>
              )}
            </button>
          ) : (
            <div>
              <NavLink to={"/login"}>
                <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-bold focus:outline-none focus:bg-blue-600">
                  Login
                </button>
              </NavLink>
            </div>
          )}
        </header>
        <SwiperComponent buttons={buttons} />
      </div>
    </>
  );
};

export default Header;
