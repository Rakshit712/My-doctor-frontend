import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import Footer from "../../Component/Footer";
import { MatchPassword, validPassword } from "../../util/validator";
import axios from "axios"; // Import axios

function ChangePassword() {
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

  const handleSubmit = async () => {
    const body = { oldPassword, newPassword };
    const data = localStorage.getItem('data');
    if (data) {
      const parsedData = JSON.parse(data);
      const token = parsedData.token;
      console.log(parsedData)
      const id = parsedData.user._id;

      const headers = {
        token: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      console.log(id)
      try {
        const response = await axios.patch(`https://my-doctors-app.onrender.com/api/auth/patient/${id}`, body, { headers });
        setSuccess("Password changed successfully!");
        setError("");
      } catch (error) {
        setError("Failed to change password");
        setSuccess("");
        console.error(error);
      }
    } else {
      setError("User data not found");
      setSuccess("");
    }
  };

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

  const disabledSubmit = !oldPassword || !newPassword || !confirmPassword || !passwordError();

  return (
    <>
      <div className="bg-gray-50">
        <Header />
        <Sidebar />
        <Container>
          <Grid container sx={{ mt: 8 }}>
            <Grid item xs={4} sx={{ m: "auto" }}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
              <Typography sx={{ color: "#3f51b5", fontSize: 40, fontWeight: "bold" }}>
                Change Password
              </Typography>

              <TextField
                sx={{ mt: 3, width: { xs: 200, sm: 300, md: 400, lg: 500 } }}
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
                sx={{ mt: 3, width: { xs: 200, sm: 300, md: 400, lg: 500 } }}
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

              <TextField
                sx={{ mt: 3, width: { xs: 200, sm: 300, md: 400, lg: 500 } }}
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyUp={() =>
                  MatchPassword(newPassword, confirmPassword, setMatchPassword)
                }
                variant="outlined"
              />

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
                  <span style={{ marginLeft: 5 }}>At least one special character</span>
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
                  <span style={{ marginLeft: 5 }}>At least eight characters</span>
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
