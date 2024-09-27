import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if email exists and password matches the confirm password
    if (userPassword !== confirmPassword) {
      setSignupError("Passwords don't match");
      alert("Passwords don't match!"); // Display error alert
      return;
    }

    try {
      setIsLoading(true);
      setSignupError(""); // Clear any previous error

      const dataToSignup = {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      };

      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q",
        dataToSignup
      );

      // Handle successful signup by alerting the user
      alert(`Signup successful! Welcome ${response.data.email}`);
      
      // Clear form fields
      setUserEmail("");
      setUserPassword("");
      setConfirmPassword("");
      
      // Navigate to login page after signup
      navigate("/login");
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred during signup";
      
      // Set the error state and show an alert with the error message
      setSignupError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signupDiv">
      <Form className="sForm" onSubmit={handleFormSubmit}>
        <h2>Sign Up</h2>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ borderColor: signupError ? "red" : "" }} 
          />
          {signupError && (
            <p style={{ color: "red", fontSize: "12px" }}>{signupError}</p> 
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="sBtn" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </Button>
        <br />
        <Button variant="primary" className="sBtn" onClick={() => navigate("/login")}>
          Already Have An Account? Login
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
