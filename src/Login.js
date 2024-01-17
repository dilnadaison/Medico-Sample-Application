import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import Homes from "./homes";


//import ReactDOM from "react-dom";

import "./Style.css";
import { fetchData } from "./Services/fetchData";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setuser] = useState([]);
  const Navigate = useNavigate();

  localStorage.setItem("loggedin", false);

  const errors = {
    email: "invalid email",
    password: "invalid password",
  };

  useEffect(() => {
    try {
      fetchData("user")
      .then(
        (result) => {
          setuser(result.data);
        },
        (error) => {
          setuser(null);
        }
      );
    } catch (error) {
      console.log("error occured!!!")
    }
   
  }, []);
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = user.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
        alert("User is successfully logged in");
        if(userData.role==="Patient"){
        Navigate("/Home");
        window.location.reload();
        }
        else{
          Navigate("/DoctorHome");
          window.location.reload();
        }
        //<Navigate to="/Homes" refresh="true"/>
        localStorage.setItem("loggedin", true);
        localStorage.setItem("username", userData.name);
        localStorage.setItem("useremail",userData.email);
        localStorage.setItem("userrole", userData.role);
        console.log(userData.email);
        console.log(userData.name);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
      localStorage.setItem("loggedin", false);
      
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div>
      <form data-testid="login-form" onSubmit={handleSubmit}>
        <div className="logininput">
          <label for="email" className="labelname">Email </label>
          <input data-testid="email-input" id="email" style={{ fontSize: 15 }} type="email" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="logininput">
          <label for="password" className="labelname">Password </label>
          <input
          id="password" 
            style={{ fontSize: 15 }}
            type="password"
            name="password"
            data-testid="password-input"
            required
          />
          {renderErrorMessage("password")}
        </div>
        <br></br>
        <div className="button-container">
          <input data-testid="login-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="login">
        <div className="title">
          <center>Sign In</center>
        </div>
        {isSubmitted ? "" : renderForm}
      </div>
    </div>
  );
}

export default Login;
