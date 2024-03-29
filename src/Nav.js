import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { Dropdown } from "react-bootstrap";
function Nav() {
  const [state, setstate] = useState({
    log: "Logout",
    user: "Hi, " + localStorage.getItem("username"),
  });
  const Navigate = useNavigate();
  //   user("Hi, " + localStorage.getItem("username"));
  // localStorage.getItem("loggedin")
  const logouts = () => {
    console.log("clicked");
    localStorage.setItem("loggedin", false);
    localStorage.setItem("username", "Welcome");
    localStorage.setItem("useremail", "");
    localStorage.setItem("userrole", "");
    state.log = localStorage.getItem("loggedin");
    Navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    // setstate(state => ({...state, log: user}))
    if (localStorage.getItem("loggedin") === "true") {
      state.log = "Logout";

      //    setstate({...state});

      console.log(localStorage.getItem("loggedin"));
    } else {
      state.user = "Hi,Welcome";
      state.log = "Login";

      setstate((state) => ({ ...state }));
    }
  }, [state]);
  if (
    localStorage.getItem("userrole") === "Doctor" &&
    localStorage.getItem("loggedin") === "true"
  ) {
    return (
      <nav>
        <ul>
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              style={{
                backgroundColor: "rgb(7 12 104)",
                borderColor: "rgb(7 12 104)",
                fontSize: 20,
              }}
            >
              <b>{state.user}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link className="droplink" onClick={() => logouts()}>
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link to="patient" className="navlink">
            Patient&emsp;
          </Link>
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              style={{
                backgroundColor: "rgb(7 12 104)",
                borderColor: " rgb(7 12 104)",
                fontSize: 21.5,
                fontFamily:"serif"
              }}
            >
              Appointments
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="viewtodayappointment" className="droplink">
                  Today's Appointments&emsp;
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="viewallappointments" className="droplink">
                 All Appointments&emsp;
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              style={{
                backgroundColor: "rgb(7 12 104)",
                borderColor: " rgb(7 12 104)",
                fontSize: 21.5,
                fontFamily:"serif"
              }}
            >
              Schedule
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="doctorschedule" className="droplink">
                  Add Schedule&emsp;
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="viewschedules" className="droplink">
                  View Schedule&emsp;
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link className="navlink">Contact Us&emsp;</Link>
          <Link className="navlink">Services&emsp;</Link>
          <Link className="navlink">About&emsp;</Link>
          <Link to="DoctorHome" className="navlink">
            Home&emsp;
          </Link>
        </ul>
      </nav>
    );
  } else if (
    localStorage.getItem("userrole") === "Patient" &&
    localStorage.getItem("loggedin") === "true"
  ) {
    return (
      <nav>
        <ul>
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              style={{
                backgroundColor: " rgb(7 12 104)",
                borderColor: " rgb(7 12 104)",
                fontSize: 20,
              }}
            >
              <b>{state.user}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link className="droplink" onClick={() => logouts()}>
                  Logout
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link to="myappointments" className="navlink">My Appointments&emsp;</Link>
          <Link className="navlink">Contact Us&emsp;</Link>
          <Link className="navlink">Services&emsp;</Link>
          <Link className="navlink">About&emsp;</Link>
          <Link to="Home" className="navlink">
            Home&emsp;
          </Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              style={{
                backgroundColor: " rgb(7 12 104)",
                borderColor: " rgb(7 12 104)",
                fontSize: 20,
              }}
            >
              <b>Hi,Welcome</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link className="droplink" to="/login">
                  Login
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Link className="navlink">Contact Us&emsp;</Link>
          <Link className="navlink">Services&emsp;</Link>
          <Link className="navlink">About&emsp;</Link>
          <Link className="navlink">Home&emsp;</Link>
        </ul>
      </nav>
    );
  }
}
export default Nav;
