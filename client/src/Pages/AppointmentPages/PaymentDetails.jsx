import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAppointmentData } from '../../store/slotSlice';
import axios from 'axios';
import moment from 'moment';

const thisYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 30; i++) {
    let year = thisYear + i;
    years.push(year);
  }
  const months = [
    { value: 0, label: "01|January" },
    { value: 1, label: "02|February" },
    { value: 2, label: "03|March" },
    { value: 3, label: "04|April" },
    { value: 4, label: "05|May" },
    { value: 5, label: "06|June" },
    { value: 6, label: "07|July" },
    { value: 7, label: "08|August" },
    { value: 8, label: "09|September" },
    { value: 9, label: "10|October" },
    { value: 10, label: "11|November" },
    { value: 11, label: "12|December" },
  ];

function PaymentDetails({back}) {
    const [cardNumber, setCardNumber] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [expiryYear, setExpiryYear] = useState(thisYear);
    const [expiryMonth, setExpiryMonth] = useState(new Date().getMonth());
    const [cardError, setCardError] = useState(false);
    const [securityError, setSecurityError] = useState(false);
    const [expiryError, setExpiryError] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const appointmentData = useSelector((state) => state.slot.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let success, error;

    const validCardNumber = () => {
        const regex = /^\d{16}$/;
        return regex.test(cardNumber);
      };
    
      const validSecurityCode = () => {
        const regex = /^\d{3,4}$/;
        return regex.test(securityCode);
      };
    
      const validExpiryDate = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        return !(expiryYear === currentYear && expiryMonth < currentMonth);
      };

      const disabledNextButton =
      !validCardNumber() ||
      !validExpiryDate() ||
      !validSecurityCode() ||
      showLoading;

      const makePayment = async () => {
        setShowLoading(true);
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryYear);
        expiryDate.setMonth(expiryMonth);
        const data = localStorage.getItem('data');
        const token = JSON.parse(data).token;
        
        const headers = {
            token: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        try {
          const resp = await axios.post(
            "http://localhost:8000/api/payment",
            {
              cardNumber,
              cvv: securityCode,
              expiryDate: moment(expiryDate).format("MM-YYYY"),
              doctorId: appointmentData?.doctor?._id,
              slotId: appointmentData?.slots?._id,
              consultancyPrice:
                appointmentData?.doctor.profile.consultationFee,
              otherName: appointmentData?.otherName,
              otherMobileNumber: appointmentData?.otherMobileNumber,
            },
            {headers}
          );
          success = "Appointment is booked successfully!";
          alert(success)
          console.log(resp)
        } catch (err) {
          error = "Appointment booking failed!";
        
        }
        
    
        setShowLoading(false);
        
        
      };

  return (
   <>
       <Grid container>
        <Grid item xs={7} xl={6} sx={{ m: "auto" }}>
          <Typography variant="h4">Appointment Details</Typography>
          <Box sx={{ mt: 2, border: 1, borderColor: "silver", px: 2, py: 4 }}>
          <Typography sx={{ fontSize: 15 }}>Accepted Credit/Debit Cards</Typography>
            {/* <img src={"https://my-doctors.net/assests/icons/cards/visa.svg"} alt="image not found" style={{ width: "9%", marginLeft: "2%", marginTop: "2%" }} />
            <img src={'https://my-doctors.net/assests/icons/cards/maestro.svg'} alt="image not found" style={{ width: "9%", marginLeft: "2%", marginTop: "2%" }} />
            <img src={"https://my-doctors.net/assests/icons/cards/western_union.svg"} alt="image not found" />
            <img src={"https://my-doctors.net/assests/icons/cards/unionpay.svg"} alt="image not found" />
            <img src={"https://my-doctors.net/assests/icons/cards/american_express.svg"} alt="image not found" />
            <img src={"https://my-doctors.net/assests/icons/cards/master_card.svg"} alt="image not found" />
            <img src={"https://my-doctors.net/assests/icons/cards/unionpay.svg"} alt="image not found" />
            <img src={"https://my-doctors.net/assests/icons/cards/jcb.svg"} alt="image not found" /> */}

            <Grid container>
              <Grid item xs={12}>
                <TextField
                sx={{mt:5}}
                  error={cardError}
                  variant="outlined"
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  label="Credit/Debit Card Number"
                  value={cardNumber}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  onChange={(e) => setCardNumber(e.target.value)}
                  onBlur={() => {
                    setCardError(!validCardNumber());
                  }}
                  helperText={cardError && "Please enter a valid 16 digit card Number"}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                <FormControl error={expiryError}>
                  <InputLabel id="demo-simple-select-label">Expiration month</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={expiryMonth}
                    label="Expiration month"
                    onChange={(e) => setExpiryMonth(Number(e.target.value))}
                    onBlur={() => {
                      setExpiryError(!validExpiryDate());
                    }}
                  >
                    {months.map((month) => (
                      <MenuItem value={month.value} key={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {expiryError && "Please select the future expiry date"}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                <FormControl error={expiryError} sx={{ width: "50%" }}>
                  <InputLabel id="demo-simple-select-label">Expiration Year</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={expiryYear}
                    label="Expiration Year"
                    onChange={(e) => setExpiryYear(Number(e.target.value))}
                    onBlur={() => {
                      setExpiryError(!validExpiryDate());
                    }}
                  >
                    {years.map((year) => (
                      <MenuItem value={year} key={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  error={securityError}
                  inputProps={{ maxLength: 4 }}
                  variant="outlined"
                  fullWidth
                  label="Security code"
                  value={securityCode}
                  placeholder="XXXX"
                  onChange={(e) => setSecurityCode(e.target.value)}
                  onBlur={() => {
                    setSecurityError(!validSecurityCode());
                  }}
                  helperText={securityError && "Please enter a valid security code"}
                />
              </Grid>
            </Grid>


            </Box>
            <Grid container spacing={1} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                disabled={showLoading}
                onClick={back}
                sx={{ color: "black", borderColor: "silver" }}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ position: "relative" }}>
              <Button
                variant="contained"
                fullWidth
                disabled={disabledNextButton}
                sx={{ backgroundColor: "#3f51b5" }}
                onClick={makePayment}
              >
                Make Payment
              </Button>
              {showLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Grid>
          </Grid>
            </Grid>

   </Grid>
   </>
  )
}

export default PaymentDetails