import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

import DriftWall from "../DesignBits/DriftWall";
import ScrollExpand from "../DesignBits/ScrollExpand";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

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

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // Only show venues that actually have an event
        const upcomingEvents = data
          .filter((event) => event.eventName && event.eventDate)
          .filter((event) => new Date(event.eventDate) >= new Date())
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    {
      icon: "♫",
      title: "Music",
      text: "Concerts & live performances",
    },
    {
      icon: "⚽",
      title: "Sports",
      text: "Games & sporting events",
    },
    {
      icon: "◉",
      title: "Comedy",
      text: "Laugh-out-loud experiences",
    },
    {
      icon: "✦",
      title: "Festivals",
      text: "Unforgettable celebrations",
    },
  ];

  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=80",
      title: "Live Events",
      href: "/Events",
    },
    {
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=80",
      title: "Festivals",
      href: "/Events",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=500&auto=format&fit=crop&q=80",
      title: "Experiences",
      href: "/Events",
    },
  ];

  return (
    <>
      <div className="homeContainer">
        <section className="homePage">
          <div className="homeNav">
            <Navbar />
          </div>

          <div className="bannerOverlay"></div>

          <div className="bannerContent">
            <span className="heroLabel">DISCOVER • BOOK • EXPERIENCE</span>

            <h1>
              Your Next
              <br />
              Unforgettable Event.
            </h1>

            <p className="bannerDescription">
              Discover amazing events, secure your tickets and create memories
              that last forever.
            </p>

            <div className="heroSearch">
              <div className="searchField">
                <span>⌕</span>
                <div>
                  <small>WHAT ARE YOU LOOKING FOR?</small>
                  <strong>Search events</strong>
                </div>
              </div>

              <div className="searchField">
                <span>⌖</span>
                <div>
                  <small>LOCATION</small>
                  <strong>Gauteng</strong>
                </div>
              </div>

              <div className="searchField">
                <span>◷</span>
                <div>
                  <small>DATE</small>
                  <strong>Any date</strong>
                </div>
              </div>

              <Link to="/Events" className="heroSearchButton">
                Find Events
              </Link>
            </div>
          </div>

          <div className="heroBottom">
            <span>SCROLL TO DISCOVER</span>
            <span className="heroLine"></span>
          </div>
        </section>

        <section className="stats">
          <div className="stat reveal">
            <strong>160+</strong>
            <span>Events & Venues</span>
          </div>

          <div className="stat reveal revealDelay1">
            <strong>5K+</strong>
            <span>Tickets Sold</span>
          </div>

          <div className="stat reveal revealDelay2">
            <strong>50+</strong>
            <span>Live Events</span>
          </div>

          <div className="stat reveal revealDelay3">
            <strong>4.9/5</strong>
            <span>Customer Rating</span>
          </div>
        </section>

        <section className="categoriesSection">
          <div className="sectionHeading reveal">
            <div>
              <span className="sectionTag">EXPLORE EVENTS</span>
              <h2>
                Find Something
                <br />
                You Love.
              </h2>
            </div>

            <Link to="/Events" className="viewAll">
              View all events →
            </Link>
          </div>

          <div className="categoryGrid">
            {categories.map((category, index) => (
              <Link
                to="/Events"
                className={`categoryCard reveal revealDelay${index + 1}`}
                key={category.title}
              >
                <span className="categoryIcon">{category.icon}</span>

                <div>
                  <h3>{category.title}</h3>
                  <p>{category.text}</p>
                </div>

                <span className="categoryArrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="eventsSection">
          <div className="sectionHeading reveal">
            <div>
              <span className="sectionTag">DON'T MISS OUT</span>
              <h2>Trending Events</h2>
            </div>

            <Link to="/Events" className="viewAll">
              Explore all →
            </Link>
          </div>

          {eventsLoading ? (
            <div className="eventsLoading">
              <span>Loading events...</span>
            </div>
          ) : events.length === 0 ? (
            <div className="eventsEmpty">
              <h3>No upcoming events</h3>
              <p>Check back soon for new events.</p>

              <Link to="/Events" className="ticketButton">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="eventsGrid">
              {events.slice(0, 3).map((event, index) => {
                const date = new Date(event.eventDate);

                return (
                  <article
                    className={`ticketCard reveal revealDelay${index + 1}`}
                    key={event._id}
                  >
                    <div className="ticketImage">
                      <img src={event.images?.[0]} alt={event.eventName} />

                      <span className="eventCategory">EVENT</span>

                      <div className="eventDate">
                        <strong>{date.getDate()}</strong>

                        <span>
                          {date
                            .toLocaleString("en-US", {
                              month: "short",
                            })
                            .toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="ticketInfo">
                      <h3>{event.eventName}</h3>

                      <p className="eventLocation">⌖ {event.venueName}</p>

                      <p className="eventLocation">{event.address}</p>

                      <div className="ticketBottom">
                        <div>
                          <small>FROM</small>

                          <strong>
                            R{Number(event.eventSeatPrice).toLocaleString()}
                          </strong>
                        </div>

                        <Link
                          to={`/Events/${event._id}`}
                          className="ticketButton"
                        >
                          Get Tickets
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="featuredEvent reveal">
          <div className="featuredImage">
            <img
              src="/assets/WhatsApp Image 2026-07-27 at 19.49.19.jpeg"
              alt="Featured event"
            />
          </div>

          <div className="featuredContent">
            <span className="sectionTag">FEATURED EXPERIENCE</span>

            <h2>
              Make Tonight
              <br />
              <span>Unforgettable.</span>
            </h2>

            <p>
              From sold-out concerts to intimate experiences, Reserve puts the
              best events right at your fingertips.
            </p>

            <div className="featuredDetails">
              <div>
                <small>DATE</small>
                <strong>29 September 2026</strong>
              </div>

              <div>
                <small>LOCATION</small>
                <strong>Johannesburg</strong>
              </div>

              <div>
                <small>TICKETS FROM</small>
                <strong>R100</strong>
              </div>
            </div>

            <Link to="/Events" className="featuredButton">
              Book Your Ticket
            </Link>
          </div>
        </section>

        <section className="howSection">
          <div className="sectionHeading centered reveal">
            <span className="sectionTag">SIMPLE & FAST</span>
            <h2>
              Book Your Ticket
              <br />
              In Three Steps.
            </h2>
          </div>

          <div className="steps">
            <div className="step reveal revealDelay1">
              <span className="stepNumber">01</span>
              <div className="stepIcon">⌕</div>
              <h3>Discover</h3>
              <p>
                Browse through exciting events and find something that matches
                your vibe.
              </p>
            </div>

            <div className="step reveal revealDelay2">
              <span className="stepNumber">02</span>
              <div className="stepIcon">▣</div>
              <h3>Choose Your Ticket</h3>
              <p>Select your preferred ticket type, quantity and event date.</p>
            </div>

            <div className="step reveal revealDelay3">
              <span className="stepNumber">03</span>
              <div className="stepIcon">✓</div>
              <h3>Enjoy The Event</h3>
              <p>
                Complete your booking and get ready for an unforgettable
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* <ScrollExpand
          src="https://img.partyslate.com/photos/2753880/photo-c619be1f-4c9a-4761-b905-b9458707cbd5.jpg?tr=w-1200,h-630,fo-fo-auto"
          alt="Live event"
          title="Your Experience Starts Here"
          scrollHint="Scroll inside the frame"
          useWindowScroll
        >
          <h2 style={{ color: "white", fontSize: "2.95rem" }}>
            See You There.
          </h2>

          <p style={{ color: "white", fontSize: "1.2rem" }}>
            Find it. Book it. Experience it.
          </p>
        </ScrollExpand> */}

        <section className="venuesSection">
          <div className="sectionHeading centered reveal">
            <span className="sectionTag">DISCOVER MORE</span>
            <h2>
              Every Event.
              <br />
              One Place.
            </h2>
          </div>

          <div className="venueGrid">
            <Link to="/Events" className="venueBox reveal revealDelay1">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=700&q=80"
                alt="Music event"
              />
              <div>
                <span>LIVE MUSIC</span>
                <strong>Feel The Music</strong>
              </div>
            </Link>

            <Link to="/Events" className="venueBox reveal revealDelay2">
              <img
                src="https://images.unsplash.com/photo-1468359601543-843bfaef291a?auto=format&fit=crop&w=700&q=80"
                alt="Sports event"
              />
              <div>
                <span>SPORTS</span>
                <strong>Feel The Energy</strong>
              </div>
            </Link>

            <Link to="/Events" className="venueBox reveal revealDelay3">
              <img
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=700&q=80"
                alt="Festival"
              />
              <div>
                <span>FESTIVALS</span>
                <strong>Create Memories</strong>
              </div>
            </Link>
          </div>
        </section>

        <div className="driftSection">
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
            // overlayColor="#172554"
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
