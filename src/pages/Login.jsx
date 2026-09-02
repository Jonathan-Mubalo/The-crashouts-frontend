import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

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

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.current.value,

          password: password.current.value,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        return (errorNotification.current.innerText = data.message);
      } else {
        sessionStorage.setItem("ReserveX", JSON.stringify(true));

        sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));

        navigate("/");
      }
    } catch (error) {
      return console.log("Something went wrong in the frontend: ", error);
    }
  };

  const clearError = () => {
    errorNotification.current.innerText = "";
  };

  return (
    <div className="loginPage">
      <div className="authCard">
        <div className="authVisual">
          <div className="visualStar">✦</div>

          <div className="visualText">
            <p>You can easily</p>

            <h2>
              Get access to Events, and Book Venues to your liking!
            </h2>
          </div>
        </div>

        <div className="authFormSide">
          <div className="authHeader">
            <span className="authSmallStar">✦</span>

            <h1>Welcome back to</h1>

            <p>ReserveX</p>
          </div>

          <p className="errorNotification" ref={errorNotification}></p>

          <form onSubmit={handleLogin} className="authForm">

            <div className="inputGroup">
              <label className="inputLabel">Your email</label>

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
                  onClick={clearError}
                />

                <span className="passwordEye">◉</span>
              </div>
            </div>

            <div className="termsText">
              By signing up you agree to{" "}
              <span className="termsLink">terms and conditions</span>
            </div>

            <button type="submit" className="submitBtn" onClick={handleLogin}>
              Login
            </button>
          </form>

          <div className="authRedirect">
            <p>
              Don't have an account?{" "}
              <span
                className="authLink"
                onClick={() => {
                  navigate("/Signin");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
