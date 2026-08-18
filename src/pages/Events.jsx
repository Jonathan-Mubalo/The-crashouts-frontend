import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from '../components/Navbar';
import { EventContext } from "../context/SpecificEvent";
import './Events.css'

function Events() {

  const [currentTab, setCurrentTab] = useState('search');

  // For the filter part to work 

  const [choosenStatus, setChoosenStatus] = useState('all')
  const [choosenSeat, setChoosenSeat] = useState('1')
  const [choosenLocation, setChoosenLocation] = useState('all');

  // FOR DYNAMIC MAPPING BASED ON WHATS STORED IN THE DATABASE
  const { allEventsData, setAllEventsData } = useContext( EventContext );
  const [bookingHistoryData, setBookingHistoryData] = useState([]);

  // USED TO DISPLAY THE SPECIFIC SEATING ARRANGEMENTS
  const dialog = useRef();

  // USE STATE USED TO FILTER AND STORE ALL OF THE INFORMATION OF AN EVENT THAT NEEDS TO BE VIEWED

  const [currentFilteredEvent, setCurrentFilteredEvent] = useState();

  // THE ENDPOINT FUNCTION THAT GETS ALL OF THE EVENTS

 

  useEffect(() => {
    const getBookingHistory = async () => {


      try {

        const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
        console.log(accessToken)
        const response = await fetch(`http://localhost:3000/seatPaymentsHistory/${accessToken}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          }
        )

        const data = await response.json();
        // console.log(data.message)
        if (response.status === 200) {
          setBookingHistoryData(data.seatHistory);
        }

        // If the user does not have a booking history this array will be the default state value that will be displayed to them
        else {
          setBookingHistoryData([{
            _id: "qwerty78",
            userName: "N/A",
            venueName: "N/A",
            address: "N/A",
            eventDate: "N/A",
            seat: "N/A",
            bookingPrice: 0,
            numberOfSeats: 0

          }]
          )
        }
      }
      catch (error) {
        console.error("There was a problem trying to get the users bookingHistory info", error)
      }
    }
    getBookingHistory()
  }, []);


  // DISPLAYING THE RIGHT EVENTS INFORMATION INSIDE THE DIALOG TAG BY FILTERING AND EVENT BASED ON THE ID THAT THE BUTTON HAS

  const dialogDisplay = (event) => {
    const filteredEvent = allEventsData.filter((item) => { return item["_id"] === event.target.id });

    // console.log("Chosen id: ", allEventsData[2]["_id"])
    // console.log("Targetted id: ", event.target.id);
    // console.log("filteredId: ", filteredEvent);

    setCurrentFilteredEvent(() => { return filteredEvent })
    // everyting()


    dialog.current.showModal();
  }

  // BOOKING A SEAT AND SELECTING IT
  const selectedSeat = (event) => {
    if( event.target.tagName === "SPAN"){
 event.target.parentElementstyle.backgroundColor =  '#4182ed';
 return;
  }
  else{
 event.target.parentElementstyle.backgroundColor =  '#4182ed';
  }
}

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

      <Navbar />

      <header className="eventsHeader">
        <div className="container headerSection">

          <div>
            <h1>Events</h1>
            <p>Browse available events, choose your seat count, and explore venues.</p>
          </div>

          {/* Works with the filter code to pull and bring up events as well as the user's booking history :) I'm so smart!! */}
          <nav>
            <button className={`nav-btn ${currentTab === 'search' ? 'active' : ''}`} onClick={() => setCurrentTab('search')}>Browse Events</button>

            <button className={`nav-btn ${currentTab === 'history' ? 'active' : ''}`} onClick={() => setCurrentTab('history')}>Booking History</button>
          </nav>
        </div>
      </header>

      {/* used ternary to make sures when pressing the browser it displays only the browser content and used the state "currentTab"*/}
      <main className="container mainContent">
        {currentTab === 'search' ? (
          <>

            <section className="filterBar">

              <div className="filterItem">
                <span className="filterIcon">Status</span>
                <div className="filterWrapper">
                  <label>Status Location</label>
                  <select className="filterDropdown" value={choosenStatus} onChange={(e) => setChoosenStatus(e.target.value)} >
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
                  <select className="filterDropdown" value={choosenSeat} onChange={(e) => setChoosenSeat(e.target.value)} >
                    {/*      {[...Array(10)].map((_, i) => (<option key={i + 1} value={i + 1}> {i + 1} {i === 0 ? 'Seat' : 'Seats'} </option>))}  */}
                  </select>
                </div>
              </div>

              <div className="filterItem">
                <span className="filterIcon">Location</span>
                <div className="filterWrapper">
                  <label>Status Location</label>
                  <select className="filterDropdown" value={choosenLocation} onChange={(e) => setChoosenLocation(e.target.value)} >
                    {/*     <option value="all">All Locations</option>{dropLocation.map((locate, index) => (<option key={index} value={locate}>{locate}</option>))} */}
                  </select>
                </div>
              </div>

              <button className="mainBtn searchBtn">Search ({choosenSeat} Seats)</button>
            </section>

            {/* The grid in which the events will take placed in dynamically... I think, Jonathan and Laura please confirm ;) */}

            <section className="section">
              <h2 className="sectionTitle">
                {choosenStatus === 'active' ? 'Currently Happening Events' : choosenStatus === 'upcoming' ? 'Coming Soon Events' : 'Available Events'}
              </h2>

              {allEventsData && allEventsData.map((event) => {

                return (<div className="eventCard" key={event._id}>
                  <div className="eventImageWrapper">
                    <img src={event.image} alt={event.title} className="eventImage" />
                    {event.tag && <span className="eventBagde">{event.tag}</span>}
                  </div>
                  <div className="eventDetails">
                    <h3 className="eventCardTitle">{event.venueName}</h3>
                    <p className="eventCardLoaction">{event.address}</p>
                    <div>
                      <span className="eventDate">{event.eventDate}</span>
                      <button className="mainBtn infoBtn" id={event._id} onClick={dialogDisplay}>Book a seat</button>
                    </div>
                  </div>
                </div>)
                // ))}
                // </div>
              })
              }

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

              <dialog ref={dialog} className="seatsDialog">
                <main className="dialog_main">
                  <h2 className="dialog_h1">Book a seat by selecting it</h2>
                  <div className="seatsGrid">
                    {currentFilteredEvent && currentFilteredEvent[0].seatArrangement.map((arr) => {
                      return (<div className="seatRow" key={arr[0]["seat"]}>
                        {arr.map((seatObj) => {
                          return (<div key={seatObj.seat} className="seat" onClick={selectedSeat}>
                            <span>{seatObj.seat}</span>
                            <span className="seatpricetag">R250</span>
                          </div>
                          )
                        }
                        )}
                      </div>
                      )
                    }
                    )}
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

                  <section className="singleEventDetails">
                    {currentFilteredEvent && currentFilteredEvent.map((event) => {

                      return (<div className="singleEventCard" key={event._id}>
                        <div className="singleEventImageWrapper">
                          <img src={event.image} alt={event.title} className="singleEventImage" />
                          {event.tag && <span className="singleEventBagde">{event.tag}</span>}
                        </div>
                        <div className="singleEventDetails">
                          <h3 className="singleEventCardTitle">{event.venueName}</h3>
                          <p className="singleEventCardLoaction">{event.address}</p>
                          <div>
                            <span className="singleEventDate">{event.eventDate}</span>
                            {/* <button className="mainBtn infoBtn" id={event._id} onClick={dialogDisplay}>Book a seat</button> */}
                          </div>
                        </div>
                      </div>)
                    })
                    }
                  </section>

                  <button className="mainBtn infoBtn dialogBtn" onClick={() => {
                    console.log("modal should be closed")
                    return dialog.current.close()
                  }}>Show less</button>
                </main>
              </dialog>
            </section>
          </>
          // booking history part of the page, is now  dynamic and fetching from the database 
        ) : (
          <section className="section">
            <h2 className="section-title">Booking History</h2>
            <div className="bookingHistoryList">
              {bookingHistoryData && bookingHistoryData.map((booking) => {
                return (
                  <div className="bookingHistoryCard" key={booking._id}>
                    <div className="bookingInfo">
                      <span className="bookingReference">Booked by: {booking.userName}</span>
                      <h3>{booking.venueName}</h3>
                      <p>{booking.address} - {booking.eventDate}</p>
                      <p className="numberOfSeats">Seats:{booking.seatNumber.map((item) => { return (` ${item.seat}`) })}</p>
                    </div>
                    <div className="bookingStatusWrapper">
                      <span className="badgeIsConfirmed">Confirmed</span>
                      <span className="totalAmount">Total: R{booking.bookingPrice * booking.numberOfSeats}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default Events;