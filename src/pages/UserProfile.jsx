import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "./UserProfile.css"

const UserProfile = () => {

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // STATE VARIABLE HOLDING A USERS INFORMATION
    const [userProfile, setUserProfile] = useState();

    // Collecting the specific users information from the users collection

    useEffect(() => {
        const getUsersProfile = async () => {

            const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
            const response = await fetch(`//localhost:3000/myProfile/${accessToken}`)

            const data = await response.json();

            console.log("The fetched user profile: ", data.userProfileInfo);
            return setUserProfile(() => { return data.userProfileInfo });

        }
        getUsersProfile();
    }, [])

    return (
        <>
            <Navbar />

                     <div className="user-profile">

                <div className="profile-header">
                    {/* <h1>Hi {(userProfile)? userProfile.userName:""}</h1> */}
                </div>

                <div className="profile-section">

                    <div className="profile-picture">
                        <div className="profile-head"></div>
                        <div className="profile-body"></div>
                    </div>

                    <h2>{(userProfile)? userProfile.userName:""}</h2>
                    <p>{(userProfile)? userProfile.role:""}</p>

                </div>

                <div className="profile-card">

                    {/* <div className="profile-message">
                        Your profile information is managed by church administrators.
                        <br />
                        You can only change your email, number and password.
                    </div> */}

                    <div className="profile-details">

                        <div className="profile-field">
                            <label>Fullname</label>
                            <input
                                type="text"
                                value="Laura malengi"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Gender</label>
                            <input
                                type="text"
                                value="Female"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value="lauramalengi06@gmail.com"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Number</label>
                            <input
                                type="text"
                                value="067800062"
                                readOnly
                            />
                        </div>

                    </div>

                    <div className="advanced-settings">

                        <div className="advanced-heading">
                            <h2>Advanced Settings</h2>
                            <span>(Change Password)</span>
                        </div>


                        <div className="password-container">

                            <div className="current-password">
                                <label>Current Password</label>

                                <input
                                    type="password"
                                />
                            </div>

                            <div className="password-row">

                                <div className="password-field">
                                    <label>New Password</label>

                                    <div className="password-input">
                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        >
                                            {showNewPassword ? "hide" : "show"}
                                        </button>
                                    </div>
                                </div>


                                <div className="password-field">
                                    <label>New Password</label>

                                    <div className="password-input">
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? "hide" : "show"}
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* <div className="user-profile">

                <div className="profile-header">
                    <h1>Hi Laura</h1>
                </div>

                <div className="profile-section">

                    <div className="profile-picture">
                        <div className="profile-head"></div>
                        <div className="profile-body"></div>
                    </div>

                    <h2>Laura Malengi</h2>
                    <p>User</p>

                </div>

                <div className="profile-card">

                    <div className="profile-message">
                        Your profile information is managed by church administrators.
                        <br />
                        You can only change your email, number and password.
                    </div>

                    <div className="profile-details">

                        <div className="profile-field">
                            <label>Fullname</label>
                            <input
                                type="text"
                                value="Laura malengi"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Gender</label>
                            <input
                                type="text"
                                value="Female"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value="lauramalengi06@gmail.com"
                                readOnly
                            />
                        </div>

                        <div className="profile-field">
                            <label>Number</label>
                            <input
                                type="text"
                                value="067800062"
                                readOnly
                            />
                        </div>

                    </div>

                    <div className="advanced-settings">

                        <div className="advanced-heading">
                            <h2>Advanced Settings</h2>
                            <span>(Change Password)</span>
                        </div>


                        <div className="password-container">

                            <div className="current-password">
                                <label>Current Password</label>

                                <input
                                    type="password"
                                />
                            </div>

                            <div className="password-row">

                                <div className="password-field">
                                    <label>New Password</label>

                                    <div className="password-input">
                                        <input
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        >
                                            {showNewPassword ? "hide" : "show"}
                                        </button>
                                    </div>
                                </div>


                                <div className="password-field">
                                    <label>New Password</label>

                                    <div className="password-input">
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? "hide" : "show"}
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div> */}
        </>
    );
};

export default UserProfile;