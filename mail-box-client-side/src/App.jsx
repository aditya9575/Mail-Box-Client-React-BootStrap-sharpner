import React from 'react'
import './App.css'
import SignupForm from './components/signup-form/SignupForm'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/login-form/LoginForm'
import ForgotPasswordForm from './components/forgot-password/ForgotPasswordForm'
import Homepage from './components/home-page/Homepage'
import EmailSenderComponent from './components/text-editor-basedEmail-sender/EmailSenderComponent'
import InboxComponent from './components/inbox-component/InboxComponent'

// fire base api key = AIzaSyDXY6vqrdHmUdbcC60-IgQto-bRakHw3-Q
// react icons 
//this editor is working -> TinyMCE -> npm install --save @tinymce/tinymce-react
// take your api key and use it in the editor provided by them 

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignupForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/forgotpassword' element={<ForgotPasswordForm/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/emailSender' element={<EmailSenderComponent/>}/>
      <Route path='/inbox' element={<InboxComponent/>}/>
    </Routes>
     
    </>
  )
}



export default App