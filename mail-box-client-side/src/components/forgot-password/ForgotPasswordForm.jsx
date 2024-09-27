import React, { useState } from "react";
import "./forgotpasswordform.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [fpMessage, setFPMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setFPMessage("");
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        requestType: "PASSWORD_RESET",
        email: registeredEmail,
      };

      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q",
        payload
      );

      // Handle success response
      setFPMessage(`A password reset link has been sent to ${response.data.email}. Please check your inbox.`);
      setRegisteredEmail(""); // Clear the input field
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error?.message || "An error occurred while sending the reset link";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="fpDiv">
      <button onClick={() => navigate(-1)} className="fpBackbtn">🔙</button>
      <br />
      <Form className="fpForm" onSubmit={handlePasswordChange}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter registered email"
            value={registeredEmail}
            onChange={(e) => setRegisteredEmail(e.target.value)}
            required
          />
        </Form.Group>

        {fpMessage && (
          <p style={{ color: "green", fontSize: "12px" }}>{fpMessage}</p>
        )}

        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        )}

        <Button
          variant="primary"
          type="submit"
          className="fpBtn"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Reset Password"}
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPasswordForm;
