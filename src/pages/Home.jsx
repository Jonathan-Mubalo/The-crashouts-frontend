import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
import DriftWall from "../DesignBits/DriftWall";
import ScrollExpand from "../DesignBits/ScrollExpand";

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

  // For the animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 },
    );
    revealElements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      revealElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      title: "Peaks",
      href: "https://example.com/one",
    },
    {
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      title: "Pup",
      href: "https://example.com/two",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGV2ZW50fGVufDB8fDB8fHww",
      title: "Falls",
      href: "https://example.com/three",
    },
  ];

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
          <div className="stat reveal">
            <strong>160+</strong>
            <span>Available Venues</span>
          </div>

          <div className="stat reveal revealDelay1">
            <strong>56+</strong>
            <span>Events</span>
          </div>

          <div className="stat reveal revealDelay2">
            <strong>3rd</strong>
            <span>Yearly Experience</span>
          </div>
        </section>

        <section>
          <div className="booking reveal">
            <h2>Book A Seat</h2>
            <a href="/Venues">VIEW AVAILABLE VENUES</a>
          </div>

          <div className="bookingSection reveal">
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
          <div className="eventImages reveal revealLeft">
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

          <div className="eventCopy reveal revealRight">
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

            <button className="Eventsbutton">
              <Link to="/Events">Explore Events</Link>
            </button>
          </div>
        </section>

        <section className="managers">
          <div className="managerContent reveal revealLeft">
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

          <div className="testimonial reveal revealRight">
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

        <ScrollExpand
          src="https://img.partyslate.com/photos/2753880/photo-c619be1f-4c9a-4761-b905-b9458707cbd5.jpg?tr=w-1200,h-630,fo-fo-auto"
          alt="Product hero"
          title="See it Reserved!"
          scrollHint="Scroll inside the frame"
          useWindowScroll
        >
          <h2 style={{ color: "white", fontSize: "2.95rem"}}>Every pixel, everywhere</h2>
          <p style={{ color: "white", fontSize: "1.95rem" }}>
            X marks the spot!
          </p>
        </ScrollExpand>

        <section className="venuesSection">
          <span className="sectionTag">For Your Convenience</span>
          <h2>Venues</h2>

          <div className="venuesGrid">
            <div className="venueBox reveal revealDelay1"></div>
            <div className="venueBox reveal revealDelay2"></div>
            <div className="venueBox reveal revealDelay3"></div>
            <div className="venueBox reveal revealDelay1"></div>
            <div className="venueBox reveal revealDelay2"></div>
            <div className="venueBox reveal revealDelay3"></div>
          </div>

          <div className="venuesFooter reveal">
            FOR VENUE MANAGERS <Link to="/Venues">ADD YOUR VENUE NOW </Link>
          </div>
        </section>

        <div style={{ height: 600 }}>
          <DriftWall
            items={items}
            columns={7}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={42}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.6}
            dim={0.55}
            overlayColor="#24599c"
            radius={14}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
