import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signin'
import Home from './pages/Home'
import UserRole from './pages/UserRole'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './authentication/ProtectedRoute'
import RestrictedAccess from './authentication/ProtectedRoute'
import RegisterVenue  from './pages/RegisterVenue'
import EventPage from './pages/Events'

function App( {user} ) {
  return (
    <>
    <BrowserRouter>

    <Navbar role={user?.} />

    <Routes>
      <Route path="/Login" element={<LoginPage />} />

      <Route path="/Signup" element={<SignUpPage />} />

      <Route path="/" element={<ProtectedRoute> 
      <Home />
        </ProtectedRoute>} />
        
        <Route path="/Event" element={<ProtectedRoute> 
          <EventPage />
        </ProtectedRoute>} />
        
           <Route path="/UserProfile" element={<ProtectedRoute> 
      <UserProfile />
        </ProtectedRoute>} />

<Route path="/RegisterVenue" element={<ProtectedRoute> 
      <RegisterVenue />
        </ProtectedRoute>} />

        <Route path="/UserProfile" element={<ProtectedRoute> 
      <UserProfile />
        </ProtectedRoute>} />
        <Route path="/UserProfile" element={<ProtectedRoute> 
      <UserProfile />
        </ProtectedRoute>} />
        <Route path="/UserProfile" element={<ProtectedRoute> 
      <UserProfile />
        </ProtectedRoute>} />
        <Route path="/UserProfile" element={<ProtectedRoute> 
      <UserProfile />
        </ProtectedRoute>} />
           <Route path="/UserRole" element={<RestrictedAccess> 
      <UserRole />
        </RestrictedAccess>} />
        
      </Routes>
</BrowserRouter>

    </>
  )
}

export default App
