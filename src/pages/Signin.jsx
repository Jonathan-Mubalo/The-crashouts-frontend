import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignUpPage () {

  const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });

  const handleSignUp = () =>{


createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-up form submitted:', formData);
  };


  return (
    <div className="loginPage">
      <div className="backgroundWrapper">
        <div className="shape shapeOne"></div>
        <div className="shape shapeTwo"></div>
      </div>

      {/* Glassmorphism Sign-Up Card */}
      <div className="signupCard">
        <h2 className="signupTitle">Create an Account</h2>

        <form onSubmit={handleSubmit} className="signupForm">
          {/* Username Field */}

          <div className="inputGroup">
            <label className="inputLabel">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="textInput"
              required
            />
          </div>

          <div className="inputGroup">
            <label className="inputLabel">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="textInput"
              required
            />
          </div>

          {/* Email Field */}
          <div className="inputGroup">
            <label className="inputLabel">E mail</label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="textInput"
              required
            />
          </div>

          {/* Password Field */}
          <div className="inputGroup">
            <label className="inputLabel">Password</label>
            <div className="passwordWrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="6+ characters"
                value={formData.password}
                onChange={handleChange}
                className="textInput passwordInput"
                required
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="termsText">
            By signing up you agree to <span className="termsLink">terms and conditions</span>
          </div>

          {/* Sign-Up Button */}
          <button type="submit" className="submitBtn">
            Register
          </button>
        </form>

        {/* Login Redirect Link */}
        <div className="loginRedirectContainer">
          <p>Already have an account? <span className="goToLogin" onClick={() =>{navigate("/Login")}}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;