import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import './Events.css'

function EventsPage() {
  const [currentTab, setCurrentTab] = useState('search');

  // For the filter part to work 

  const [choosenStatus, setChoosenStatus] = useState('all')
  const [choosenSeat, setChoosenSeat] = useState('1')
  const [choosenLocation, setChoosenLocation] = useState('all');
  const [allEventsData, setAllEventsData] = useState([]);

  // THE ENDPOINT FUNCTION THAT GETS ALL OF THE EVENTS

  useEffect(() => {
    const getAllEvents = async () => {
      try {

        const response = await fetch('http://localhost:3000/upcomingEvent',
          {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          }
        );
        const data = await response.json();
        console.log(data.message)
        setAllEventsData(data.message);
      }
      catch (error) {
        console.error("There was a frontend error trying to get all of the events ", error)
      }
    }
    getAllEvents()
  }, [])

  // hardcoded locations and events 

  const availableEvents = [
    {
      id: 1,
      title: 'Comic Con',
      location: 'CBD',
      date: '27 September',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      status: 'active',
    },
    {
      id: 2,
      title: 'G-12 Conference',
      location: 'Centurion, Irene Park',
      date: '19 Febuary',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      status: 'active',
    },
    {
      id: 3,
      title: 'Youth Fest',
      location: 'Moroleta Park',
      date: '16 June',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      status: 'active',
    },
    {
      id: 4,
      title: 'Leadership Summit',
      location: 'Centurion, Irene Park',
      date: '03 December',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
      status: 'active',
    }
  ]

  const comingSoonEvents = [
    {
      id: 5,
      title: 'Apartheid Photo Exhibition',
      location: 'Johannesburg, CBD',
      date: '30 November',
      image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80',
      status: 'upcoming',
    },
    {
      id: 6,
      title: 'Apartheid Photo Exhibition',
      location: 'Cape Town',
      date: '15 December',
      image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=600&q=80',
      status: 'upcoming',
    },
  ]

  // this makes the filter part with create unique locations for the select dropdown
  // uses array destructing to store the state of each event

  const allEvents = [...availableEvents, ...comingSoonEvents];

  const dropLocation = Array.from(new Set(allEvents.map((e) => e.location)));

  const filteredLocation = allEvents.filter((event) => {
    const matchChoice = choosenStatus === 'all' || event.status === choosenStatus;
    const matchLocations = choosenLocation === 'all' || event.location === choosenLocation;
    return matchChoice && matchLocations;
  })

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
                    {[...Array(10)].map((_, i) => (<option key={i + 1} value={i + 1}> {i + 1} {i === 0 ? 'Seat' : 'Seats'} </option>))}
                  </select>
                </div>
              </div>

              <div className="filterItem">
                <span className="filterIcon">Location</span>
                <div className="filterWrapper">
                  <label>Status Location</label>
                  <select className="filterDropdown" value={choosenLocation} onChange={(e) => setChoosenLocation(e.target.value)} >
                    <option value="all">All Locations</option>{dropLocation.map((locate, index) => (<option key={index} value={locate}>{locate}</option>))}
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
                //   {filteredLocation.length === 0 ? ( <p className="noMatch">No events found.</p> ) : (
                // <div className="eventsGrid">
                // {filteredLocation.map((event) => ( 
               return( <div className="eventCard" key={event._id}>
                  <div className="eventImageWrapper">
                    <img src={event.image} alt={event.title} className="eventImage" />
                    {event.tag && <span className="eventBagde">{event.tag}</span>}
                  </div>
                  <div className="eventDetails">
                    <h3 className="eventCardTitle">{event.venue}</h3>
                    <p className="eventCardLoaction">{event.address}</p>
                    <div>
                      <span className="eventDate">{event.eventDate}</span>
                      <button className="mainBtn infoBtn">More Info</button>
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
            </section>
          </>
          // booking history part of the page, it's hardcoded for now, it should be tho!
        ) : (
          <section className="section">
            <h2 className="section-title">Booking History</h2>
            <div className="bookingHistoryList">
              <div className="bookingHistoryCard">
                <div className="bookingInfo">
                  <span className="bookingReference">Ref: RSA-0707262</span>
                  <h3>AGT Women's Conference</h3>
                  <p>Centurion, Irene Park - 05 September 2025</p>
                  <p className="numberOfSeats">Seats: A5, A6</p>
                </div>
                <div className="bookingStatusWrapper">
                  <span className="badgeIsConfirmed">Confirmed</span>
                  <span className="totalAmount">R700</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default EventsPage;