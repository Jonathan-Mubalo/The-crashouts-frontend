import { useState, useEffect } from 'react';
import './Login.css'; 

function LoginPage () {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    
    <div className="loginPage">
      <div className="backgroundWrapper" >
        <div className="shape shapeOne"></div>
        <div className="shape shapeTwo"></div>
      </div>

      {/* Glassmorphism Card  */}

      <div className="loginCard">
        <h2 className="loginTitle">Login</h2>

        <form onSubmit={handleSubmit} className="loginForm">

          {/* Username Field */}

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

          {/* Login Button */}

          <button type="submit" className="submitBtn">
            Login
          </button>
        </form>

        {/* Sign-Up Link */}

        <div className="signupContainer">
          <a href="#signup" className="signupLink">
            Don't have an Account? Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage 