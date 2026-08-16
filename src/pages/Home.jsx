import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      const credentials = signOut(auth);
      sessionStorage.setItem("ReserveX", JSON.stringify(false));

      console.log(
        "sessionStorage logout: ",
        JSON.parse(sessionStorage.getItem("ReserveX")),
      );
      navigate("/Login");
    } catch (error) {
      return alert("Unable to currently logout");
    }
  };
  return (
    <>
      {/* <h1>This is the home page</h1>
            <button className="logOutBtn" onClick={handleLogout}>Log out</button> */}

      <div className="homeContainer">
        <Navbar />

        <div className="homePage">
          <div className="bannerOverlay"></div>

          <div className="bannerContent">
            <p>YOUR PERFECT EVENT STARTS HERE</p>

            <h1>
              Embark On Your Journey To Secure <br /> The Ideal Getaway.
            </h1>

            <p className="bannerDescription">
              Discover exceptional venues and create memorable experiences.{" "}
              <br /> Find the perfect destination for your next event.{" "}
            </p>
          </div>
        </div>

        <section className="statSection">
          <div className="stat">
            <strong>160+</strong>
            <span>Available Venues</span>
          </div>

          <div className="stat">
            <strong>56+</strong>
            <span>Events</span>
          </div>

          <div className="stat">
            <strong>3rd</strong>
            <span>Yearly Experience</span>
          </div>
        </section>

        <section>
          <div className="booking">
            <h2>Book A Seat</h2>
            <span>VIEW AVAILABLE VENUES</span>
          </div>

          <div className="bookingSection">
            <div className="bookingSectionTwo">
              <span className="fieldIcon">&#9728;</span>
              <div>
                <small>Location</small>
                <strong>Gauteng</strong>
              </div>
            </div>

            <div className="bookingSectionTwo">
              <span className="fieldIcon">&#9728;</span>
              <div>
                <small>Guest</small>
                <strong>1 Person</strong>
              </div>
            </div>

            <div className="bookingSectionTwo">
              <span className="fieldIcon">&#9728;</span>
              <div>
                <small>Date</small>
                <strong>Select Date</strong>
              </div>
            </div>

            <button className="searchButton" Link to="/">
              Search
            </button>
          </div>
        </section>

        <section className="event-section">
          <div className="eventImages">
            <div className="eventImageMain">
              <img
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=85"
                alt="Event"
              />
            </div>

            <div className="priceBadge">
              <strong>R1500, Starting Price</strong>
              <span>Event Registration</span>
            </div>
          </div>

          <div className="eventCopy">
            <p className="sectionLabel">FOR OUR CUSTOMERS</p>
            <h2>Event Hosting Made Easy</h2>
            <p>
              Host unforgettable experiences with venues designed around your
              needs. From intimate gatherings to large celebrations, we've got
              the perfect space for you.
            </p>

            <div className="benefit">
              <span>&#9729;</span>

              <p>
                <strong>Working Quality</strong>
                <br />
                Reliable spaces, designed for every occasion.
              </p>
            </div>

            <div className="benefit">
              <span>&#9729;</span>

              <p>
                <strong>Wide Event Environment</strong>
                <br />
                Choose from hundreds of unique locations.
              </p>
            </div>

            <button className="Eventsbutton">Explore Events</button>
          </div>
        </section>

        <section className="managers">
          <div className="managerContent">
            <p>FOR VENUE MANAGERS</p>
            <h2>Live Venues</h2>

            <div className="managerCards">
              <div className="managerImage">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=85"
                  alt="Venue"
                />

                <button>&#9654;</button>
              </div>

              <div className="managerFeatures">
                <div>
                  <span>&#8472;</span>

                  <p>
                    <strong>Unique Facilities</strong>
                    <br />
                    Explore beautiful event spaces.
                  </p>
                </div>

                <div>
                  <span>&#8472;</span>

                  <p>
                    <strong>Easy Booking</strong>
                    <br />
                    Reserve your venue in minutes.
                  </p>
                </div>

                <div>
                  <span>&#8472;</span>

                  <p>
                    <strong>Great Locations</strong>
                    <br />
                    Venues in conveniet locations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial">
            <div className="quote">“</div>

            <p>
              "Reserve makes finding the right venue incredibly simple. The
              booking process was seamless and the venue exceeded our
              expectations."
            </p>

            <div className="testimonialPerson">
              <div className="avatar">J.D</div>

              <div>
                <strong>John Doe</strong>
                <span>Event Organizer</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
