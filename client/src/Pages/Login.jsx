import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";


import { useNavigate } from "react-router-dom";
import Header from "../Component/Navbar";
import { userLogin } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        userLogin({
          identifier,
          password,
        })
      );

      if (response.meta.requestStatus === "fulfilled") {
        navigate("/");

        setError(null);
      } else {
        setError(
          "Mobile Number/Email or password is incorrect. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);

      setError(
        "Mobile Number/Email or password is incorrect. Please try again."
      );
    }
  };



  return (
    <>
      <Header />
      <div className="flex sm:items-center bg-gray-50 sm:justify-between sm:p-5 sm:gap-100 h-full overflow-hidden">
        <div className="sm:mr-20">
          <img
            className="w-[716px] mt-[50px] hidden md:hidden lg:block "
            src="https://my-doctors.net/assests/images/login%20and%20registration/login.svg"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:w-[496px] lg:h-[341px] gap-4  sm:mt-[-300px] sm:mr-[100px] p-8 sm:p-0 ">
          <div className="flex w-[311px] sm:w-[450px] ">
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
          <div className="  h-[358px] p-3 sm:w-full sm:max-w-md  ">
           
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded px-8 pt-4 pb-8 mb-4 border"
            >
               
            {error && <Alert sx={{mb:4, mx:3}} severity="error">{error}</Alert>}
  
              <div className="mb-8">
                <TextField
                  className="w-full"
                  label="Email or Mobile Number"
                  id="email"
                  
                  variant="outlined"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <TextField
                  className="w-full"
                  label="Password"
                  id="password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  LOGIN
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="text-center p-7  text-sm flex  gap-2 ">
                Don't have an account yet ?
                <p className="text-blue-500">signup</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
