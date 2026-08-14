import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { auth } from "../firebase";

function SignIn() {

  const navigate = useNavigate();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const errorMessages = useRef();
  const loginSuccess = useRef();

  // Firebase signin mixed with mongodb
  
  const handleSignUp = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch('http://localhost:3000/signup',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName.current.value,
            email: email.current.value,
            password: password.current.value
          })
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        return errorMessages.current.innerText = data.message;
      }

      else {
        loginSuccess.current.innerText = data.message;
        sessionStorage.setItem("ReserveX", JSON.stringify(true));
        sessionStorage.setItem("accessToken", JSON.stringify( data.accessToken));
        // const token = JSON.parse(sessionStorage.getItem("accessToken"));
        // console.log("firebaseProvidedToken: ",token );
        navigate("/")
      }
    }
    catch (error) {
      console.log("Something mostlikely went wrong in the frontend");
    }
  }

  // USED TO CLEAR ANY ERROR MESSAGE THAT THE PASSWORD INPUT DISPLAYS FROM FIRBASE

  const clearErrorNotification = () => {
    errorMessages.current.innerText = ""
    loginSuccess.current.innerText = ""
  }


  return (
    <>
    <div className="loginPage">
      {/* <div className="backgroundWrapper">
        <div className="shape shapeOne">lhfd</div>
        <div className="shape shapeTwo">h,kjgnfc</div>
      </div> */}

      {/* Glassmorphism Sign-Up Card */}
      <div className="signupCard">
        <h2 className="signupTitle">Create an Account</h2>
        <p className="loginSuccess" ref={loginSuccess} ></p>
        <p className="errorMessages" ref={errorMessages} ></p>

        <form onSubmit={handleSignUp} className="signupForm">

          {/* Username Field */}

          <div className="inputGroup">
            <label className="inputLabel">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="textInput"
              required
              ref={userName}
              onClick={clearErrorNotification}
            />
          </div>

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
              onClick={clearErrorNotification}
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
                onClick={clearErrorNotification}
              />
            </div>
          </div>

          {/* ERROR NOTIFICATION COMING FROM FIREBASE */}


          {/* Terms and Conditions */}
          <div className="termsText">
            By signing up you agree to <span className="termsLink">terms and conditions</span>
          </div>

          {/* Sign-Up Button */}
          <button type="submit" className="submitBtn">
            Signup
          </button>
        </form>

        {/* Login Redirect Link */}
        <div className="loginRedirectContainer">
          <p>Already have an account? <span className="goToLogin" onClick={() => { navigate("/Login") }}>Login</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignIn;