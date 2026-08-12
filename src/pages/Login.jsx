import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import "./Login.css"

function LoginPage () {

  const navigate = useNavigate();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const errorNotification = useRef();

  const handleLogin = async (e) =>{

    e.preventDefault();

    try{
const userCredentials = await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
const firebaseCredentials = userCredentials.user.accessToken;

console.log("LoginaccessToken: ",firebaseCredentials);
sessionStorage.setItem("ReserveX", JSON.stringify(true));
navigate("/")
}
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
console.log(errorCode);
console.log(errorMessage);
    if(errorCode){
     errorNotification.current.innerText="Invalid email or password."
    }

  };

  }

  const clearError = () =>{
    errorNotification.current.innerText = "";
  }

  return (
    
    <div className="loginPage">
      <div className="backgroundWrapper" >
        <div className="shape shapeOne"></div>
        <div className="shape shapeTwo"></div>
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
              ref = {email}
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
                ref = {password}
                onClick={clearError}
              />
            </div>
          </div>

          {/* Terms and Conditions */}

          <div className="termsText">
            By signing up you agree to <span className="termsLink">terms and conditions</span>
          </div>

          {/* Login Button */}

          <button type="submit" className="submitBtn" onClick={ handleLogin }>
            Login
          </button>
        </form>

        {/* Sign-Up Link */}

        <div className="signupContainer">
          <p>
            Don't have an Account? <span className="goToSignin" onClick={() =>{navigate("/Signup")}}>Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage 