import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const LoginForm = () => {

    const [userLoginEmail, setUserLoginEmail] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [LoginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();

    // Check if email exists and password matches the confirm password
    if (userEmail && userPassword === confirmPassword) {
        setLoginError(""); // Clear any previous error
      alert("User registration successful. Please Login to continue.");
      console.log("User has successfully logged in")
    //   console.log("User Email is " + userEmail + " And user password is " + userPassword );
      
    setUserLoginEmail("");
    setUserLoginPassword("");
    } else {
        setLoginError("Invalid Credentials");
    }
  };

  const handlePasswordChange = () => {
    // const endPoint = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]"
    // axios.post()
  }

  return (
    <div>
      <div className="signupDiv">
      <Form className="sForm" onSubmit={handleUserLogin}>
        <h2>Login</h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={userLoginEmail}
            onChange={(e) => setUserLoginEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={userLoginPassword}
            onChange={(e) => setUserLoginPassword(e.target.value)}
          />
        </Form.Group>


        <Button variant="primary" type="submit" className="lBtn">
         Login
        </Button>
        <Link to="/forgotpassword" >Forgot password</Link>
        <br />
        <Button variant="primary" className="lBtn" onClick={()=>{navigate("/")}}>
          Don't Have An Account? Sign Up.
        </Button>
      </Form>
    </div>  
    </div>
  )
}

export default LoginForm