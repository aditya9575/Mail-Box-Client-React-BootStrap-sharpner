import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup.css";

const SignupForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if email exists and password matches the confirm password
    if (userEmail && userPassword === confirmPassword) {
      setSignupError(""); // Clear any previous error
      alert("User registration successful. Please Login to continue.");
      console.log("User Email is " + userEmail + " And user password is " + userPassword );
      
      setUserEmail("");
      setUserPassword("");
      setConfirmPassword("");
    } else {
      setSignupError("Entered Passwords Don't Match");
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
            style={{ borderColor: signupError ? "red" : "" }} // Change border color if there's an error
          />
          {signupError && (
            <p style={{ color: "red", fontSize: "12px" }}>{signupError}</p> // Display the error message
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="sBtn">
          Signup
        </Button>
        <br />
        <Button variant="primary" className="sBtn">
          Already Have An Account? Login
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
