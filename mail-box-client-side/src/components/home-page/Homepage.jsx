import React from 'react';
import Button from 'react-bootstrap/Button';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Welcome To Mail Box Client</h2>
      <hr />
      <div className="center-buttons">
        <Button variant="primary" className="custom-button" size="lg" onClick={()=>{navigate("/emailSender")}}>Compose Mail</Button>
        <Button variant="primary" className="custom-button" size="lg" onClick={()=>{navigate("/inbox")}}>Inbox</Button>
      </div>
    </>
  );
};

export default Homepage;