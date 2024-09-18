import React from 'react'
import './App.css'
import SignupForm from './components/signup-form/SignupForm'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/login-form/LoginForm'
import ForgotPasswordForm from './components/forgot-password/ForgotPasswordForm'
import Homepage from './components/home-page/Homepage'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignupForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/forgotpassword' element={<ForgotPasswordForm/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
    </Routes>
     
    </>
  )
}

export default App