import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../firebase";

function SignIn() {
  const navigate = useNavigate();

  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const errorMessages = useRef();
  const loginSuccess = useRef();

 const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userName: userName.current.value,

        email: email.current.value,

        password: password.current.value,
      }),
    });

      const data = await response.json();

      if (response.status !== 200) {
        return (errorMessages.current.innerText = data.message);
      } else {
        loginSuccess.current.innerText = data.message;

        sessionStorage.setItem("ReserveX", JSON.stringify(true));

        sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));

        navigate("/");
      }
    } catch (error) {
      console.log("Something mostlikely went wrong in the frontend");
    }
  };

  const clearErrorNotification = () => {
    errorMessages.current.innerText = "";

    loginSuccess.current.innerText = "";
  };

  return (
    <div className="loginPage">
      <div className="authCard">
        <div className="authVisual">
          <div className="visualStar">*</div>

          <div className="visualText">
            <p>Start your journey</p>

            <h2>Create your account to access Events!</h2>
          </div>
        </div>

        <div className="authFormSide">
          <div className="authHeader">
            <span className="authSmallStar">*</span>

            <h1>Create an account</h1>

            <p>
              Create your account and keep your booking history, event schedule and venue booking.
            </p>
          </div>

          <p className="loginSuccess" ref={loginSuccess}></p>

          <p className="errorMessages" ref={errorMessages}></p>

          <form onSubmit={handleSignUp} className="authForm">
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

            <div className="inputGroup">
              <label className="inputLabel">Your email</label>

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

            <div className="inputGroup">
              <label className="inputLabel">Password</label>

              <div className="passwordWrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="6+ characters"
                  className="textInput passwordInput"
                  required
                  ref={password}
                  onClick={clearErrorNotification}
                />

                <span className="passwordEye">◉</span>
              </div>
            </div>

            <div className="termsText">
              By signing up you agree to{" "}
              <span className="termsLink">terms and conditions</span>
            </div>

            <button type="submit" className="submitBtn">
              Get Started
            </button>
          </form>

          <div className="authRedirect">
            <p>
              Already have an account?{" "}
              <span
                className="authLink"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
