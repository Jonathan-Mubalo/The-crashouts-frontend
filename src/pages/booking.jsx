import React from 'react';
import './booking.css';

function BookingPage () {
  return (
    <div className="page">

      <main className="content">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="title">Select Your Seats</h1>
          <p className="subtitle">Row A: R350 | Row B: R250 | Row C: R200</p>

          <div className="grid">
            
            <div className="box">
              <span className="tag">Auditorium Layout</span>
              <div className="screen">SCREEN</div>
              
              <div className="seatsgrid">
                {['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5'].map((id) => (
                  <div key={id} className="seat">
                    <span>{id}</span>
                    <span className="seatpricetag">R250</span>
                  </div>
                ))}
              </div>

              <div className="legend">
                <div className="seatStatus">
                  <div className="statusItem" style={{ backgroundColor: '#e2e8f0' }} /> Available
                </div>
                <div className="seatStatus">
                  <div className="statusItem" style={{ backgroundColor: '#4182ed' }} /> Selected
                </div>
                <div className="seatStatus">
                  <div className="statusItem" style={{ backgroundColor: '#cbd5e1' }} /> Booked
                </div>
              </div>
            </div>

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
          </div>

          <div className="buttongroup">
            <button className="btn">Proceed to Payment (R600)</button>
          </div>
        </div>
      </main>

    </div>
  );
}

export default BookingPage