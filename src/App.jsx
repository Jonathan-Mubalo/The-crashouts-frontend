import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import Home from './pages/Home'
import Events from './pages/Events'
import UserRole from './pages/UserRole'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './authentication/ProtectedRoute'
import RestrictedAccess from './authentication/ProtectedRoute'
import RegisterVenue from './pages/RegisterVenue'
import SeatBooking from './pages/SeatBooking'
import SpecificEvent from './context/SpecificEvent'
import Contact from './pages/Contact'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signin" element={<SignIn />} />

          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />


          <Route path="/Events" element={<ProtectedRoute>
            <SpecificEvent>
              <Events />
            </SpecificEvent>
          </ProtectedRoute>} />

          <Route path="/SeatBooking" element={<ProtectedRoute>
            <SpecificEvent>
              <SeatBooking />
            </SpecificEvent>
          </ProtectedRoute>} />

          <Route path="/UserProfile" element={<ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>} />

          <Route path="/RegisterVenue" element={<ProtectedRoute>
            <RegisterVenue />
          </ProtectedRoute>} />


          <Route path="/Contact" element={<ProtectedRoute>
            <Contact />
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

export default App;
