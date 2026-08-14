import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import "./Login.css"

function LoginPage() {

  const navigate = useNavigate();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const errorNotification = useRef();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value
        })
      });

      const data = await response.json();
        // console.log("Error out of  if statement: ", response.status );

      if (response.status !== 200) {
        // console.log("Error in if statement: ",response.status);
        return errorNotification.current.innerText = data.message;
      }

      else {
        sessionStorage.setItem("ReserveX", JSON.stringify(true));
        sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        navigate("/");
      }
    }
    catch (error) {
      return console.log("Something went wrong in the frontend: ", error);
    }
  }

  const clearError = () => {
    errorNotification.current.innerText = "";
  }

  return (

    <div className="loginPage">
      <div className="backgroundWrapper" >
        <div className="shape shapeOne">o;iul.k,ymjhbv</div>
        <div className="shape shapeTwo">;.uilymgbfs</div>
      </div>

      {/* Glassmorphism Card  */}

      <div className="loginCard">
        <h2 className="loginTitle">Login</h2>
        <p className="errorNotification" ref={errorNotification}></p>
        <form onSubmit={handleLogin} className="loginForm">

          {/* Email Field */}

          <div className="inputGroup">
            <label className="inputLabel">E mail</label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              className="textInput"
              required
              ref={email}
              onClick={clearError}
            />
          </div>

          {/* Password Field */}

          <div className="inputGroup">
            <label className="inputLabel">Password</label>
            <div className="passwordWrapper">
              <input
                type='password'
                name="password"
                placeholder="6+ characters"
                className="textInput passwordInput"
                required
                ref={password}
                onClick={clearError}
              />
            </div>
          </div>

          {/* Terms and Conditions */}

          <div className="termsText">
            By signing up you agree to <span className="termsLink">terms and conditions</span>
          </div>

          {/* Login Button */}

          <button type="submit" className="submitBtn" onClick={handleLogin}>
            Login
          </button>
        </form>

        {/* Sign-Up Link */}

        <div className="signupContainer">
          <p>
            Don't have an Account? <span className="goToSignin" onClick={() => { navigate("/Signin") }}>Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;