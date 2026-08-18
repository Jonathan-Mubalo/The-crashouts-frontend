import React from 'react';


const Test = () => {
    return (
         <>
       <section ref={dialog} className="seatsDialog">
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
            <div className="statusItem" style={{ backgroundColor: 'var(--myLightBlue)' }} /> Selected
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

        <div className="formcol">
          <div className="selectiondetailscard">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a2b4c', marginBottom: '0.5rem' }}>
              Selection Summary
            </h3>

            <div className="venueDetails">
              <span className="venueLabel">Seat Number(s):</span>
              <span className="venueStyle">A1, B2</span>
            </div>

            <div className="venueDetails">
              <span className="venueLabel">Dynamic Price Breakdown:</span>
              <span className="venueStyle">A1: R350, B2: R250</span>
            </div>

            <div className="venueDetails" style={{ borderBottom: 'none' }}>
              <span className="venueLabel">Selection Status:</span>
              <span className="venueStyle" style={{ color: '#10b981' }}> 2 Seat(s) Chosen </span>
            </div>
          </div>

          <div className="formgroup">
            <label>Pick a Date</label>
            <div className="inputbox">
              <span style={{ color: '#4182ed', fontWeight: 'bold' }}>Date</span>
              <input type="date" className="inputBox" />
            </div>
          </div>
        </div>
        <section>
          <button className="mainBtn infoBtn dialogBtn" onClick={() => { dialog.current.close() }}>Show less</button>
          <button className="mainBtn infoBtn dialogBtn" onClick={() => { dialog.current.close() }}>Show less</button>
        </section>

      </main>
    </section>

    </> 
    );
}
 
export default Test;