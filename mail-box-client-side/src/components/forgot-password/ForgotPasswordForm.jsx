import React, { useState } from 'react'
import "./forgotpasswordform.css"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {

const [registeredEmail, setRegisteredEmail] = useState("");  
const navigate = useNavigate();
const handlePasswordChange = () => {
    
}

  return (
    <div>
    <button onClick={()=>{navigate(-1)}}>🔙</button>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Enter registered email" value={registeredEmail} 
      onChange={(e)=>{setRegisteredEmail(e.target.value)}}/>
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handlePasswordChange}>
      Reset Password
    </Button>
  </Form>
  </div>
  )
}

export default ForgotPasswordForm