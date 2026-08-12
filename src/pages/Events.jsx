import './Events.css';
import React from 'react';
import Navbar from "../components/Navbar.jsx";


function EventPage () {

    const currentEvents = [
        {
      id: 1,
      title: 'AGT Youth Fest',
      address: '',
      location: 'Cape Town',
      date: '16 June 2027',
      image: '',
    },
    {
      id: 2,
      title: 'G-12 Conference',
      address: '',
      location: 'Cape Town',
      date: '27 February 2027',
      image: '',
    },
    {
      id: 3,
      title: 'Comic-Con',
      address: '',
      location: 'Cape Town',
      date: '15 August 2026',
      image: '',
    },
    {
      id: 4,
      title: 'Jewellex Africa (JXA)',
      address: '',
      location: 'Johannesburg',
      date: '7 September 2026',
      image: '',
    },
    {
      id: 5,
      title: 'AWS Summit, Johannesburg',
      address: '',
      location: 'Johannesburg',
      date: '15 August 2026',
      image: '',
    },
    ];

    return (
        <>
        <Navbar />
      <header className="eventsHeader">

        <div className="eventContainer">
          <h1 className="pageTitle">Events</h1>
          <p className="pageSubtitle">
            Events take place throughout the year, from educational showpieces to public lectures, national tours and one-off exhibitions.
          </p>
        </div>

        <main className="container mainContent">
        <section className="section">
          <h2 className="sectionTitle">Available Events</h2>
          <div className="eventsGrid">
            
              <div className="eventCard">
                <div className="eventImageWrapper">
                  <img src={event.image} alt={event.title} className="eventImage" />
                </div>
                <div className="eventDetails">
                  <h3 className="eventCardTitle">{event.title}</h3>
                  <p className="eventLocation">{event.location}</p>
                  <div className="eventFooter">
                    <span className="eventDate">{event.date}</span>
                    <button className="infoBtn">More Info</button>
                  </div>
                </div>
              </div>
          </div>
        </section>
    </main>

      </header>
        </>
    )
}

export default EventPage