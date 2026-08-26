import React, { useState, useEffect, useRef, useContext } from "react";
import "./SeatBooking.css";
import Navbar from "../components/Navbar";
import { EventContext } from "../context/SpecificEvent";
import { useNavigate } from "react-router-dom";

const SeatBooking = () => {
  // NAVIGATION USED TO GO BACK TO THE EVENTS PAGE
  const navigate = useNavigate();

  // IMPORTING THE VALUES STORED IN THE CONTEXT
  const { storedEvent, allEventsData, setAllEventsData } =
    useContext(EventContext);

  const [currentTab, setCurrentTab] = useState("search");

  // FOR DYNAMIC MAPPING BASED ON WHATS STORED IN THE DATABASE
  const [bookingHistoryData, setBookingHistoryData] = useState([]);

  // USE STATE USED TO FILTER AND STORE ALL OF THE INFORMATION OF AN EVENT THAT NEEDS TO BE VIEWED

  const [currentFilteredEvent, setCurrentFilteredEvent] = useState();

  // DISPLAYING THE RIGHT EVENTS INFORMATION INSIDE THE DIALOG TAG BY FILTERING AND EVENT BASED ON THE ID THAT THE BUTTON HAS
  console.log("Id used to navigate to this page: ", storedEvent);
  useEffect(() => {
    const filteredEvent = allEventsData.filter((item) => {
      return item["_id"] === storedEvent;
    });

    setCurrentFilteredEvent(() => {
      return filteredEvent;
    });
  }, []);

  // BOOKING A SEAT AND SELECTING IT
  const selectedSeat = (event) => {
    if (event.target.tagName === "SPAN") {
      event.target.parentElement.style.backgroundColor = "#4182ed";
      return;
    } else {
      event.target.style.backgroundColor = "#4182ed";
    }
  };

  return (
    <>
      <Navbar />
      <div className="seatBookingPage">
        <main className="container mainContent">
          <section className="section">
            <section className="seatsDialog">
              <main className="dialog_main">
                
                <div className="bookingHeaderCard">
                  <h2 className="dialog_h1">Select Your Seat</h2>
                  <p className="dialog_subtitle">Choose your preferred spot from the seating chart below.</p>
                  <div className="screenIndicator">STAGE / SCREEN</div>
                </div>

                <div className="seatsGridContainer">
                  <div className="seatsGrid">
                    {currentFilteredEvent && currentFilteredEvent[0].seatArrangement.map((arr) => {
                      return (
                        <div className="seatRow" key={arr[0]["seat"]}>
                          {arr.map((seatObj) => {
                            return (
                              <div key={seatObj.seat} className="seat" onClick={selectedSeat}>
                                <span>{seatObj.seat}</span>
                                <span className="seatpricetag">R250</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="legend">
                  <div className="seatStatus">
                    <div className="statusItem" style={{ backgroundColor: '#e2e8f0' }} /> Available
                  </div>
                  <div className="seatStatus">
                    <div className="statusItem" style={{ backgroundColor: '#4182ed' }} /> Selected
                  </div>
                  <div className="seatStatus">
                    <div className="statusItem" style={{ backgroundColor: '#072447' }} /> Booked
                  </div>
                </div>

                <section className="singleEventDetailsWrapper">
                  {currentFilteredEvent && currentFilteredEvent.map((event) => {
                    return (
                      <div className="singleEventCard" key={event._id}>
                        {event.image && (
                          <div className="singleEventImageWrapper">
                            <img src={event.image} alt={event.title} className="singleEventImage" />
                            {event.tag && <span className="singleEventBadge">{event.tag}</span>}
                          </div>
                        )}
                        <div className="singleEventDetailContent">
                          <h3 className="singleEventCardTitle">{event.venueName || event.title}</h3>
                          <p className="singleEventCardLocation">{event.address}</p>
                          <div className="singleEventMeta">
                            <span className="singleEventDate">{event.eventDate}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </section>

                <button className="mainBtn infoBtn dialogBtn" onClick={() => { navigate(-1); }}>
                  Go back to events
                </button>
              </main>
            </section>
          </section>
        </main>
      </div>
    </>
  );
};

export default SeatBooking;
