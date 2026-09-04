import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./UserProfile.css";

const UserProfile = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getUsersProfile = async () => {
      try {
        const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        const response = await fetch(`${API_URL}/myProfile/${accessToken}`);

        const data = await response.json();

        console.log("The fetched user profile: ", data.userProfileInfo);

        if (response.ok) {
          setUserProfile(data.userProfileInfo);
        }
      } catch (error) {
        console.error("Unable to fetch user profile:", error);
      }
    };

    getUsersProfile();
  }, []);

  return (
    <>
      <Navbar />

      <main className="userProfile">
        <section className="profileHero">
          <div className="profileHeroGlow"></div>

          <div className="profileHeroContent">
            <span className="profileEyebrow">ACCOUNT • PROFILE</span>

            <h1>My Profile</h1>

            <p>Manage your personal information and account security.</p>
          </div>
        </section>

        <section className="profileWrap">
          <div className="profileIntro">
            <div className="profileAvatar">
              <div className="avatarHead"></div>
              <div className="avatarBody"></div>
            </div>

            <div className="profileIdentity">
              <h2>{userProfile ? userProfile.userName : "Loading..."}</h2>

              <span>{userProfile ? userProfile.role : "User"}</span>
            </div>
          </div>

          <div className="profileCard">
            <div className="cardHead">
              <div>
                <span className="cardEyebrow">PERSONAL INFORMATION</span>

                <h2>Profile Details</h2>

                <p>Your account information and contact details.</p>
              </div>
            </div>

            <div className="profileDetails">
              <div className="profileField">
                <label>Full Name</label>

                <input
                  type="text"
                  value={userProfile ? userProfile.userName : ""}
                  readOnly
                />
              </div>

              <div className="profileField">
                <label>Gender</label>

                <input
                  type="text"
                  value={userProfile ? userProfile.gender : ""}
                  readOnly
                />
              </div>

              <div className="profileField">
                <label>Email Address</label>

                <input
                  type="email"
                  value={userProfile ? userProfile.email : ""}
                  readOnly
                />
              </div>

              <div className="profileField">
                <label>Phone Number</label>

                <input
                  type="text"
                  value={userProfile ? userProfile.phoneNumber : ""}
                  readOnly
                />
              </div>
            </div>

            <div className="security">
              <div className="securityHead">
                <div>
                  <span className="cardEyebrow">ACCOUNT SECURITY</span>

                  <h2>Change Password</h2>

                  <p>Keep your account secure by using a strong password.</p>
                </div>

                <div className="securityIcon">🔒</div>
              </div>

              <div className="passwordBox">
                <div className="passwordField">
                  <label>Current Password</label>

                  <input type="password" />
                </div>

                <div className="passwordGrid">
                  <div className="passwordField">
                    <label>New Password</label>

                    <div className="passwordInput">
                      <input type={showNewPassword ? "text" : "password"} />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="passwordField">
                    <label>Confirm New Password</label>

                    <div className="passwordInput">
                      <input type={showConfirmPassword ? "text" : "password"} />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <button className="savePassword">Update Password</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserProfile;
