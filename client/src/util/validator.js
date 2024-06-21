import axios from "axios";

export function validPassword(
    password,
    confirmPassword,
    setValidLowerCase,
    setValidUpperCase,
    setValidSpecialCharacter,
    setValidNumber,
    setValidLength,
    setMatchPassword
) {
    setValidLowerCase(/[a-z]/.test(password) ? true : false);
    setValidUpperCase(/[A-Z]/.test(password) ? true : false);
    setValidSpecialCharacter(/[!@#$%^&*]/.test(password) ? true : false);
    setValidNumber(/[0-9]/.test(password) ? true : false);
    setValidLength(password.length >= 8 ? true : false);
    setMatchPassword(password === confirmPassword ? true : false);
}

export function MatchPassword(password, confirmPassword, setMatchPassword) {
    setMatchPassword(password === confirmPassword ? true : false);
}

export async function validMobile(contactNo, setMobileError, setMobileErrorMsg) {
    const regex = /^[1-9][0-9]{9}$/;
    const userData = { contactNo };
    
    if (regex.test(contactNo)) {
      try {
        await axios.post(`http://localhost:8000/api/auth/validate`, userData);
        setMobileError(false); 
        setMobileErrorMsg("");
      } catch (error) {
        setMobileError(true);
        setMobileErrorMsg("Mobile number already exists");
      }
    } else {
      setMobileError(true);
      setMobileErrorMsg("Please enter a valid 10-digit mobile number!");
    }
  }
  
  
  export async function validEmail( email, setEmailError, setEmailErrorMsg) {
    const regex = /^[_a-zA-Z0-9\.\s\-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const userData = {email}
    if (regex.test(email)) {
     try {
        await axios.post(`http://localhost:8000/api/auth/validate`,userData);
        setEmailError(false); 
        setEmailErrorMsg("");
      } catch(error) {
          setEmailError(true);
          setEmailErrorMsg("Email address already exist");
        };
          
       
    } else {
      setEmailError(true);
      setEmailErrorMsg("Please enter a valid e-mail address!");
    }
  }