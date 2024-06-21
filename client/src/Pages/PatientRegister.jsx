import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Component/Navbar";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { userSignin } from "../store/userSlice";
import Alert from "@mui/material/Alert";
import { MatchPassword, validEmail, validMobile, validPassword } from "../util/validator";
import { Box, Button } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import Footer from "../Component/Footer";

const PatientRegister = () => {
  
  const [name, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [contactNo, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [matchPassword, setMatchPassword] = useState(false);
  const [validLowercase, setValidLowerCase] = useState(false);
  const [ValidUpperCase, setValidUpperCase] = useState(false);
  const [validSpecialCharacter, setValidSpecialCharacter] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validLength, setValidLength] = useState(false);

  const passwordError = () => {
    return (
      matchPassword &&
      validLowercase &&
      ValidUpperCase &&
      validSpecialCharacter &&
      validNumber &&
      validLength
    );
  };

  const disableRegister = () => {
    return !passwordError() || mobileError || emailError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate password and confirm password match
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Dispatch userSignin action
      const response = await dispatch(
        userSignin({
          name,
          gender,
          dateOfBirth,
          contactNo,
          email,
          password,
        })
      );

      // Check if response is ok
      if (response.meta.requestStatus === 'fulfilled') {
        // Set registration success to true
        setRegistrationSuccess(true);

        // Clear any previous error message
        setError(null);
      } else {
        // Set registration success to false
        setRegistrationSuccess(false);

        // Set error message from the response
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Set registration success to false
      setRegistrationSuccess(false);
      // Set error message
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex  bg-gray-50 sm:items-center sm:justify-between  sm:p-5 gap-100">

        <div className="sm:mr-20">

          <img
            className="w-[716px] mt-[50px]  hidden sm:block"
            src="https://my-doctors.net/assests/images/login%20and%20registration/final%20registration.svg"
            alt=""
          />

        </div>

        <div className="flex flex-col justify-center items-center sm:w-[496px] sm:h-[341px]  gap-1 sm:gap-3  sm:mt-[-300px] sm:mr-[100px] p-8 sm:p-0 ">

          <div className="flex w-[311px] sm:w-[450px] mt-[585px] ">

            <NavLink to={"/login"}>

              <button className="border sm:w-[150px] p-6 sm:p-3">LOGIN</button>

            </NavLink>

            <NavLink to={"/patientRegister"}>

              <button className="border sm:w-[150px] p-3">

                PATIENT SIGNUP
              </button>

            </NavLink>

            <NavLink to={"/doctorRgister"}>

              <button className="border sm:w-[150px] p-3">DOCTOR SIGNUP</button>

            </NavLink>
          </div>

          <div className="w-full   max-w-md bg-white border rounded-md p-4">

            {registrationSuccess ? (

              <Alert severity="success">Registration successful!</Alert>

            ) : error ? (

              <Alert severity="error">{error}</Alert>

            ) : null}

            <h6 className="font-bold text-lg "> Create an account</h6>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto  space-y-4  p-2"
            >

              <div>

                <label className="block mb-1" htmlFor="full-name">
                  Full Name*
                </label>

                <TextField
                  placeholder="Enter Name"
                  fullWidth
                  type="text"
                  value={name}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Gender*</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Date of Birth*</label>

                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block mb-1">Mobile Number*</label>
                <TextField
                  error={mobileError}
                  placeholder="Enter Mobile Number"
                  fullWidth
                  type="text"
                  value={contactNo}
                  onKeyUp={() =>
                    validMobile(contactNo, setMobileError, setMobileErrorMsg)
                  }
                  onBlur={() =>
                    validMobile(contactNo, setMobileError, setMobileErrorMsg)
                  }
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  inputProps={{ maxLength: 10, "data-testid": "contact" }}
                />

                {mobileError && <span style={{ color: "red" }}>{mobileErrorMsg}</span>}

              </div>

              <div>
                <label className="block mb-1">Email*</label>
                <TextField
                  placeholder="abc@gmail.com"
                  fullWidth
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={() =>
                    validEmail(email, setEmailError, setEmailErrorMsg)
                  }
                  onBlur={() => validEmail(email, setEmailError, setEmailErrorMsg)}
                  required
                />

                {emailError && <span style={{ color: "red" }}>{emailErrorMsg}</span>}

              </div>

              <div>
                <label className="block mb-1">Create Password*</label>
                <TextField
                  placeholder="create password"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRules(true)}
                  onKeyUp={() =>
                    validPassword(
                      password,
                      confirmPassword,
                      setValidLowerCase,
                      setValidUpperCase,
                      setValidSpecialCharacter,
                      setValidNumber,
                      setValidLength,
                      setMatchPassword
                    )
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Confirm Password*</label>
                <TextField
                  placeholder="confirm password"
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyUp={() =>
                    MatchPassword(password, confirmPassword, setMatchPassword)
                  }
                  required
                />
              </div>
              
              {showPasswordRules && (
                <Box sx={{ my: 3 }}>
                  <Box sx={{ display: "flex" }}>
                    {validLowercase ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>A lowercase letter.</span>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {ValidUpperCase ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>A Uppercase letter</span>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {validSpecialCharacter ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>
                      At least one special character
                    </span>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {validNumber ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>At least one number.</span>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {validLength ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>At least eight character</span>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    {matchPassword ? (
                      <Done sx={{ color: "green" }} />
                    ) : (
                      <Close sx={{ color: "red" }} />
                    )}
                    <span style={{ marginLeft: 5 }}>Passwords must match</span>
                  </Box>
                </Box>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={disableRegister()}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Register
              </Button>
              <p className="text-center">Already have an account? Sign in</p>
            </form>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default PatientRegister;
