import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import { EventContext } from "../context/SpecificEvent";
import "./Events.css";
import { useNavigate } from "react-router-dom";
import ScrollExpand from "../DesignBits/ScrollExpand";

function Events() {
  // THIS NAVIGATION ELEMENT IS USED TO NAVIGATE TO THE NEXT PAGE WHENEVER SOMEONE WANTS TO BOOK A SEAT
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("search");

  // For the filter part to work
  const [choosenStatus, setChoosenStatus] = useState("all");
  const [choosenSeat, setChoosenSeat] = useState("1");
  const [choosenLocation, setChoosenLocation] = useState("all");

  // CONTEXT FILE STATE VARIABLES
  const { setStoredEvent, allEventsData, setAllEventsData } =
    useContext(EventContext);

  const [bookingHistoryData, setBookingHistoryData] = useState([
    {
      _id: "qwerty78",
      userName: "N/A",
      venueName: "N/A",
      address: "",
      eventDate: "N/A",
      seatNumber: [{ seat: "N/A" }],
      bookingPrice: 0,
      numberOfSeats: 0,
    }
  ]);

  // USE STATE USED TO FILTER AND STORE ALL OF THE INFORMATION OF AN EVENT THAT NEEDS TO BE VIEWED
  const [currentFilteredEvent, setCurrentFilteredEvent] = useState();

  // THE ENDPOINT FUNCTION THAT GETS ALL OF THE EVENTS
  useEffect(() => {
  const getBookingHistory = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
      console.log(accessToken);
      const response = await fetch(
        `${API_URL}/seatPaymentsHistory/${accessToken}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = await response.json();
      if (response.status === 200) {
        setBookingHistoryData(data.seatHistory);
      }
    } catch (error) {
      console.error(
        "There was a problem trying to get the users bookingHistory info",
        error,
      );
    }
  };
  getBookingHistory();
}, []);

  const displaySeatBooking = (event) => {
    console.log(event.target.id);
    setStoredEvent(event.target.id);
    navigate("/SeatBooking");
  };

  // const everyting = () => {
  //   console.log("currentFilteredEvent:", currentFilteredEvent);
  //   console.log("seatArrangement:", currentFilteredEvent?.seatArrangement);
  // }

  // hardcoded locations and events

  // const availableEvents = [

  // ]

  // this makes the filter part with create unique locations for the select dropdown
  // uses array destructing to store the state of each event

  // const allEvents = [...availableEvents, ...comingSoonEvents];

  // const dropLocation = Array.from(new Set(allEvents.map((e) => e.location)));

  // const filteredLocation = allEvents.filter((event) => {
  //   const matchChoice = choosenStatus === 'all' || event.status === choosenStatus;
  //   const matchLocations = choosenLocation === 'all' || event.location === choosenLocation;
  //   return matchChoice && matchLocations;
  // })

  // this makes the filter part with create unique locations for the select dropdown

  return (
    <div className="eventPage">
      

      <header className="eventsHeader">
  <Navbar />

  <div className="eventContainer headerSection">
    <div className="heroContent">
      <span className="heroEyebrow">DISCOVER • BOOK • EXPERIENCE</span>

      <h1>Find Your Next Event</h1>

      <p>
        Browse available events, choose your seats, and experience
        unforgettable moments at amazing venues.
      </p>
    </div>

    <div className="eventsTabs">
      <button
        className={`eventTab ${currentTab === "search" ? "active" : ""}`}
        onClick={() => setCurrentTab("search")}
      >
        Browse Events
      </button>

      <button
        className={`eventTab ${currentTab === "history" ? "active" : ""}`}
        onClick={() => setCurrentTab("history")}
      >
        Booking History
      </button>

      <button
        className={'eventTab'}
      >
        My Events
      </button>
    </div>
  </div>
</header>

      {/* used ternary to make sures when pressing the browser it displays only the browser content and used the state "currentTab"*/}
      <main className="eventContainer mainContent">
        {currentTab === "search" ? (
          <>
            {/* <section className="filterBar">
              <div className="filterItem">
                <span className="filterIcon">Status</span>
                <div className="filterWrapper">
                  <label>Status Location</label>
                  <select
                    className="filterDropdown"
                    value={choosenStatus}
                    onChange={(e) => setChoosenStatus(e.target.value)}
                  >
                    <option value="all">All Events</option>
                    <option value="active">Currently Happening</option>
                    <option value="upcoming">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="filterItem">
                <span className="filterIcon">Seats</span>
                <div className="filterWrapper">
                  <label>Number Of Seats</label>
                  <select
                    className="filterDropdown"
                    value={choosenSeat}
                    onChange={(e) => setChoosenSeat(e.target.value)}
                  >
                    {/*      {[...Array(10)].map((_, i) => (<option key={i + 1} value={i + 1}> {i + 1} {i === 0 ? 'Seat' : 'Seats'} </option>))}  
                  </select>
                </div>
              </div>

              <div className="filterItem">
                <span className="filterIcon">Location</span>
                <div className="filterWrapper">
                  <label>Status Location</label>
                  <select
                    className="filterDropdown"
                    value={choosenLocation}
                    onChange={(e) => setChoosenLocation(e.target.value)}
                  >
                         <option value="all">All Locations</option>{dropLocation.map((locate, index) => (<option key={index} value={locate}>{locate}</option>))} 
                  </select>
                </div>
              </div>

              <button className="mainBtn searchBtn">
                Search ({choosenSeat} Seats)
              </button>
            </section> */}

            {/* The grid in which the events will take placed in dynamically... I think, Jonathan and Laura please confirm ;) */}

            <h2 className="sectionTitle">
              {choosenStatus === "active"
                ? "Currently Happening Events"
                : choosenStatus === "upcoming"
                  ? "Coming Soon Events"
                  : "Available Events"}
            </h2>
            <section className="section currentEvents">
              {allEventsData &&
                allEventsData.map((event) => {
                  // gets the events address and displays the directions
                  const handleGetDirections = (address) => {
                    const encodedAddress = encodeURIComponent(address);
                    const interactiveMapUrl = `https://www.openstreetmap.org/search?query=${encodedAddress}`;
                    window.open(interactiveMapUrl, "_blank");
                  };
                  return (
                    <div className="eventCard" key={event._id}>
                      <div className="eventImageWrapper">
                        <img
                          src={event.images[0]}
                          alt={event.title}
                          className="eventImage"
                        />
                        {event.tag && (
                          <span className="eventBagde">{event.tag}</span>
                        )}
                      </div>
                      <div className="eventDetails">
                        <h3 className="eventCardTitle">{event.venueName}</h3>
                        <p className="eventCardLoaction">{event.address}</p>
                        <div>
                          <span className="eventDate">{event.eventDate}</span>
                          <button
                            className="mainBtn infoBtn"
                            id={event._id}
                            onClick={displaySeatBooking}
                          >
                            Book a seat
                          </button>

                          <button
                            className="mainBtn directionsBtn"
                            onClick={() => handleGetDirections(event.address)}
                          >
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* {filteredLocation.length === 0 ? ( <p className="noMatch">No events found.</p> ) : (
                <div className="eventsGrid">
                  {filteredLocation.map((event) => ( 
                    <div className="eventCard" key={event.id}>
                      <div className="eventImageWrapper"> 
                        <img src={event.image} alt={event.title} className="eventImage" />
                        {event.tag && <span className="eventBagde">{event.tag}</span>}
                      </div>
                      <div className="eventDetails">
                        <h3 className="eventCardTitle">{event.title}</h3>
                        <p className="eventCardLoaction">{event.location}</p>
                        <div>
                          <span className="eventDate">{event.date}</span>
                          <button className="mainBtn infoBtn">More Info</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </section>
          </>
        ) : (
          // booking history part of the page, is now  dynamic and fetching from the database
          <section className="section">
            <h2 className="section-title">Booking History</h2>
            <div className="bookingHistoryList">
              {bookingHistoryData &&
                bookingHistoryData.map((booking) => {
                  return (
                    <div className="bookingHistoryCard" key={booking._id}>
                      <div className="bookingInfo">
                        <p>
                         <span className="bookingReference">Booked by:</span> {booking.email}
                        </p>
                        <h3>{booking.venueName}</h3>
                        <p>
                          {booking.address} - {booking.eventDate}
                        </p>
                        <p className="numberOfSeats">
                          {`Seats: ${booking.seatNumber}`}
                        </p>
                      </div>
                      <div className="bookingStatusWrapper">
                        <span className="badgeIsConfirmed">Confirmed</span>
                        <span className="totalAmount">
                          Total: R{booking.bookingPrice * booking.numberOfSeats}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Events;
