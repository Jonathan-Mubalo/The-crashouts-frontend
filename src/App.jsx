import { useState } from 'react'
import './App.css'
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signin'

function App() {
  const [currentPage, setCurrentPage] = useState('signin');

  return (
    <>
      <LoginPage />

      <SignUpPage />

    </>
  )
}

export default App
