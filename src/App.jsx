import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signin'
import Home from './pages/Home'
import ProtectedRoute from './authentication/ProtectedRoute'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignUpPage />} />
      <Route path="/" element={<ProtectedRoute> 
      <Home />
        </ProtectedRoute>} />
      </Routes>
      
</BrowserRouter>
    </>
  )
}

export default App
