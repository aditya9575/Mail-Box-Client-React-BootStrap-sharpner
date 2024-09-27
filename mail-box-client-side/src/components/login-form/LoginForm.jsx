import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


const LoginForm = () => {

    const [userLoginEmail, setUserLoginEmail] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
        setIsLoading(true);
        setLoginError(""); // Clear any previous error
  
        // Data for login
        const loginData = {
          email: userLoginEmail,
          password: userLoginPassword,
          returnSecureToken: true,
        };
  
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q",
          loginData
        );
  
        // Handle successful login
        alert(`Login successful! Welcome ${response.data.email}`);
        
        // Store ID token (optional, based on your app's need)
        localStorage.setItem("idToken", response.data.idToken);
        
        // Clear input fields
        setUserLoginEmail("");
        setUserLoginPassword("");
  
        // Navigate to another page after successful login
        navigate("/homepage"); // Example path, you can update this
      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.error?.message || "An error occurred during login";
        
        // Set error message and show it in an alert
        setLoginError(errorMessage);
      } finally {
        setIsLoading(false);
      }
  };


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

        {loginError && (
          <p style={{ color: "red", fontSize: "12px" }}>{loginError}</p> // Display the error message
        )}
        <Button variant="primary" type="submit" className="lBtn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
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