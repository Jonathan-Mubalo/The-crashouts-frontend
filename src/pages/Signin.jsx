import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignUpPage() {

  const navigate = useNavigate();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const emailError = useRef();
  const passwordError = useRef();

  // Firebase signin mixed with mongodb
  const handleSignUp = async (e) => {

    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);

      const firebaseCredentials = userCredential.user.accessToken;
      sessionStorage.setItem("ReserveX", JSON.stringify(true))
      console.log("firebaseProvidedToken: ", firebaseCredentials);
      const mongoDB = await fetch('http://localhost:3000/signup',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: userName.current.value,
            email: email.current.value
          })

        }
      );
      navigate("/")
    }
    catch (error) {
      const errorCode = error.code;
      console.log("ErrorCode: ", errorCode);
      const errorMessage = error.message;
      console.log("ErrorMessage: ", errorMessage);

      if (errorMessage.includes("invalid-email).")) {
        return emailError.current.innerText = "Invalid email format";
      }

      if (errorMessage.includes("email-already-in-use")) {
        return emailError.current.innerText = "Email is unavailable";
      }

      else {
        passwordError.current.innerText = errorMessage.slice(9, -22)
      }
    }


  }

  // USED TO CLEAR ANY ERROR MESSAGE THAT THE PASSWORD INPUT DISPLAYS FROM FIRBASE

  const clearErrorNotification = () => {
    emailError.current.innerText = ""
    passwordError.current.innerText = ""
  }


  return (
    <div className="loginPage">
      <div className="backgroundWrapper">
        <div className="shape shapeOne"></div>
        <div className="shape shapeTwo"></div>
      </div>

      {/* Glassmorphism Sign-Up Card */}
      <div className="signupCard">
        <h2 className="signupTitle">Create an Account</h2>

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
            />
          </div>
          <p className="emailError" ref={emailError} onClick={clearErrorNotification} ></p>

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

          <p className="passwordError" ref={passwordError} ></p>

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
  );
}

export default SignUpPage;