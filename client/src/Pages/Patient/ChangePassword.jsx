import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Done, TextFieldsOutlined } from "@mui/icons-material";
import Footer from "../../Component/Footer";
import { MatchPassword, validPassword } from "../../util/validator";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/userSlice";

function ChangePassword() {
    const dispatch = useDispatch();
    
    const handleSubmit= ()=>{
        dispatch(changePassword({oldPassword,newPassword}))
    }
  const passwordError = () => {
    if (
      matchPassword &&
      validLowercase &&
      ValidUpperCase &&
      validSpecialCharacter &&
      validNumber &&
      validLength
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [matchPassword, setMatchPassword] = useState(false);
  const [validLowercase, setValidLowerCase] = useState(false);
  const [ValidUpperCase, setValidUpperCase] = useState(false);
  const [validSpecialCharacter, setValidSpecialCharacter] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  const disabledSubmit = !oldPassword || !passwordError();
  return (
    <>
      <div className="bg-gray-50  ">
        <Header />
        <Sidebar />
        <Container>
          <Grid container sx={{ mt: 8 }}>
            <Grid item xs={4} sx={{ m: "auto" }}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <Typography
                variant="h4"
                sx={{ color: "#3f51b5", fontWeight: "bold" }}
              >
                Change Password
              </Typography>

              <TextField
                sx={{
                  mt: 3,
                  width: {
                    xs: 200,
                    sm: 300,
                    md: 400,
                    lg: 500,
                  },
                }}
                id="outlined-basic"
                type="password"
                label="Current Password"
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                variant="outlined"
              />

              <TextField
                sx={{
                  mt: 3,
                  width: {
                    xs: 200,
                    sm: 300,
                    md: 400,
                    lg: 500,
                  },
                }}
                id="outlined-basic"
                label="New Password"
                type="password"
                fullWidth
                required
                value={newPassword}
                onBlur={(e) =>
                  !e.target.value
                    ? setPasswordErrorMsg(true)
                    : setPasswordErrorMsg(false)
                }
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyUp={() =>
                  validPassword(
                    newPassword,
                    confirmPassword,
                    setValidLowerCase,
                    setValidUpperCase,
                    setValidSpecialCharacter,
                    setValidNumber,
                    setValidLength,
                    setMatchPassword
                  )
                }
                variant="outlined"
              />
              {passwordErrorMsg && (
                <span style={{ color: "red" }}>
                  New Password cannot be empty!
                </span>
              )}
              <TextField
                sx={{
                  mt: 3,
                  width: {
                    xs: 200,
                    sm: 300,
                    md: 400,
                    lg: 500,
                  },
                }}
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                error={passwordErrorMsg}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyUp={() =>
                  MatchPassword(newPassword, confirmPassword, setMatchPassword)
                }
                variant="outlined"
              />
              <Box sx={{ my: 3 }}>
                <Box sx={{ display: "flex" }}>
                  {validLowercase == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}>A lowercase letter.</span>
                </Box>

                <Box sx={{ display: "flex" }}>
                  {ValidUpperCase == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}> A Uppercase letter</span>
                </Box>

                <Box sx={{ display: "flex" }}>
                  {validSpecialCharacter == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}>
                    {" "}
                    At least one special character{" "}
                  </span>
                </Box>

                <Box sx={{ display: "flex" }}>
                  {validNumber == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}>At least one number.</span>
                </Box>

                <Box sx={{ display: "flex" }}>
                  {validLength == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}>At least eight character</span>
                </Box>

                <Box sx={{ display: "flex" }}>
                  {matchPassword == true ? (
                    <Done sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )}
                  <span style={{ marginLeft: 5 }}>Passwords must match</span>
                </Box>
              </Box>
              <Button
                type="submit"
                variant="contained"
                disabled={disabledSubmit}
                onClick={handleSubmit}
                sx={{ my: 3 }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
