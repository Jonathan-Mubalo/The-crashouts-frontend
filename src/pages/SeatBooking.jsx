import React, { useState, useEffect, useRef, useContext } from "react";
import "./SeatBooking.css";
import Navbar from "../components/Navbar";
import { EventContext } from "../context/SpecificEvent";
import { useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import { jsPDF } from "jspdf";

const publicKey = "pk_test_2c7fa0027b2eb549818e537b4750b0258a2d7bd3";

const SeatBooking = () => {
  // NAVIGATION USED TO GO BACK TO THE EVENTS PAGE
  const navigate = useNavigate();

  // IMPORTING THE VALUES STORED IN THE CONTEXT
  const { storedEvent, allEventsData, setAllEventsData } = useContext(EventContext);

  const [currentTab, setCurrentTab] = useState("search");

  // FOR DYNAMIC MAPPING BASED ON WHATS STORED IN THE DATABASE
  const [bookingHistoryData, setBookingHistoryData] = useState([]);

  // USE STATE USED TO FILTER AND STORE ALL OF THE INFORMATION OF AN EVENT THAT NEEDS TO BE VIEWED
  const [currentFilteredEvent, setCurrentFilteredEvent] = useState();

  // STATE VALUE THAT WILL BE USED TO STORE THE TOTAL FOR THE NUMBER OF SEATS BOOKED
  const [numberOfBookedSeats, setNumberOfBookedSeats] = useState(0);

  // THE SEAT BOOKING PRICE
  const [seatPrice, setSeatPrice] = useState(0);

  // STATE VARIALE THAT STORES ALL OF THE BOOKED SEATS IN AN ARRAY
  const [bookedSeats, setBookedSeats] = useState([]);

  // DISPLAYING THE RIGHT EVENTS INFORMATION INSIDE THE DIALOG TAG BY FILTERING AND EVENT BASED ON THE ID THAT THE BUTTON HAS
  // console.log("Id used to navigate to this page: ", storedEvent);

  useEffect(() => {

    // USED TO COLLECT THE PRODUCT WHENEVER THE PAGE IS RELOADED MAKEING ALL OF THE STATE VARIABLES BECOME NULL OR UNDEFINED
    if (!storedEvent) {
      const storedFilteredEvent = JSON.parse(sessionStorage.getItem("filteredEvent"))
      // console.log("storedFilteredEvent: ", storedFilteredEvent)
      setCurrentFilteredEvent(() => {
        return storedFilteredEvent;
      });

      setSeatPrice(() => { return parseInt(storedFilteredEvent[0].eventSeatPrice) })
      return;
    }

    const filteredEvent = allEventsData.filter((item) => {
      return item["_id"] === storedEvent;
    });

    setCurrentFilteredEvent(() => {
      return filteredEvent;
    });

    setSeatPrice(() => { return filteredEvent[0].eventSeatPrice })

    sessionStorage.setItem("filteredEvent", JSON.stringify(filteredEvent))

  }, []);

  // BOOKING A SEAT AND SELECTING IT


  const selectedSeat = (event) => {


    let seat = event.target.innerText;
    if (bookedSeats.includes(seat)) {

      console.log("remove");
      event.target.style.backgroundColor = '#e2e8f0';
      let num = bookedSeats.indexOf(seat);
      bookedSeats.splice(num, 1);
      setBookedSeats(() => { return bookedSeats });
      console.log(bookedSeats)
      return setNumberOfBookedSeats(() => { return bookedSeats.length });

    }
    else {

      console.log("add");
      event.target.style.backgroundColor = '#4182ed';
      bookedSeats.push(seat)
      setBookedSeats(() => { return bookedSeats });
      console.log(bookedSeats)
      return setNumberOfBookedSeats(() => { return bookedSeats.length });

    }

  };


  // ENDPOINT USED TO BOOK A SEAT

  const bookSeats = async () => {

try{

  console.log("bookSeats function has started");

    const email = JSON.parse(sessionStorage.getItem("accessToken"));
console.log("email: ",email)
    const response = await fetch(`//localhost:3000/bookingSeat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        bookingPrice: seatPrice,
        eventDate: currentFilteredEvent[0].eventDate,
        bookedBy: email,
        numberOfSeats: bookedSeats.length,
        seatNumber: bookedSeats,
        venueName: currentFilteredEvent[0].venueName,
        address: currentFilteredEvent[0].address,
        eventName: currentFilteredEvent[0].eventName
      })
    });

    const data = await response.json();

    if (response.status !== 200) {
      alert(data.message);
    }
    else {

      alert(data.message);

      // CURRENT FILTERED EVENT IS AN ARRAY WITH ONE OBJECT CONTAINING
      //  LITERALLY ALL OF THE INFORMATION THAT IS BEING DISPLAYED ON THE SCREEN 
      // BY USING THE MAPPING EFFECT

        setBookedSeats( ()=>{ return [...[]] });
        setNumberOfBookedSeats( ()=>{ return 0 });
        const newCurrentFilteredEvent = currentFilteredEvent;
        newCurrentFilteredEvent[0].seatArrangement = data.seatArrangement;
        setCurrentFilteredEvent( ()=>{ return newCurrentFilteredEvent })


      // THIS IS WHAT CAUSES THE SUBMISSION TO GO BACK TO THE EVENTS PAGE
      // It needs to go back to the events page or the user will not be able to see that their chair was booked because it will not automatically render the component
      // navigate(-1);

    }
  }
  catch (error){
    console.error("There was an error while trying to book a seat: ", error)
  }
}

// Pay Stack

const handlePaystackPayment = () => {
    if (bookedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    const email = JSON.parse(sessionStorage.getItem("accessToken")) || "customer@example.com";
    const totalAmountInCents = Math.round(numberOfBookedSeats * seatPrice * 100);

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: publicKey,
      email: email,
      amount: totalAmountInCents,
      currency: "ZAR",
      metadata: {
        custom_fields: [
          {
            display_name: "Selected Seats",
            variable_name: "selected_seats",
            value: bookedSeats.join(", "),
          },
        ],
      },
      onSuccess: (transaction) => {
        axios
          .get(`http://localhost:5173/api/paystack/verify/${transaction.reference}`)
          .then((response) => {
            if (response.data.status || response.data.data.status === "success") {
              bookSeats();
              generatePDFTicket(transaction.reference); // <-- Trigger PDF generation
            }
          })
          .catch((error) => {
            console.error("Verification error:", error);
            bookSeats();
            generatePDFTicket(transaction.reference || "TEST-REF"); // <-- Trigger for test mode fallback
          });
      },
      onCancel: () => {
        alert("Transaction was cancelled.");
      },
    });
  };

  // pdf ticket generator, work in progress

  const generatePDFTicket = (transactionReference) => {
  const doc = new jsPDF();
  const eventTitle = currentFilteredEvent[0]?.venueName || currentFilteredEvent[0]?.title || "Event Ticket";
  const eventDate = currentFilteredEvent[0]?.eventDate || "TBD";
  const eventAddress = currentFilteredEvent[0]?.address || "TBD";
  const userEmail = JSON.parse(sessionStorage.getItem("accessToken")) || "Attendee";

  // Ticket Header Box
  doc.setFillColor(37, 99, 235); // Blue background
  doc.rect(15, 15, 180, 25, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("OFFICIAL EVENT TICKET", 20, 31);

  // Event Details
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.text(eventTitle, 20, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${eventDate}`, 20, 65);
  doc.text(`Venue Address: ${eventAddress}`, 20, 72);

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 80, 190, 80);

  // Booking & Attendee Info
  doc.setFont("helvetica", "bold");
  doc.text("Attendee Information:", 20, 92);
  doc.setFont("helvetica", "normal");
  doc.text(`Email: ${userEmail}`, 20, 100);

  doc.setFont("helvetica", "bold");
  doc.text("Seat Details:", 20, 112);
  doc.setFont("helvetica", "normal");
  doc.text(`Selected Seats: ${bookedSeats.join(", ")}`, 20, 120);
  doc.text(`Total Seats: ${numberOfBookedSeats}`, 20, 127);
  doc.text(`Total Paid: R${numberOfBookedSeats * seatPrice}`, 20, 134);

  // Footer / Reference
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 145, 190, 145);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Reference ID: ${transactionReference}`, 20, 155);
  doc.text("Thank you for your booking!", 20, 162);

  // Save the PDF
  doc.save(`Ticket-${bookedSeats.join("-")}.pdf`);
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
                              <div key={seatObj.seat} className="seat" style={{ backgroundColor: (seatObj.isBooked) ? '#072447' : '#e2e8f0', color: (seatObj.isBooked) ? '#e2e8f0' : '' }} onClick={(seatObj.isBooked) ? "" : selectedSeat} >
                                {seatObj.seat}
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

                {/* SEAT BOOKING SUMMARY */}
                <section className="bookingSummary">
                  <p><span>Price per seat: R{seatPrice}</span> <span>Selected seats: {bookedSeats.join(" ")}</span></p>
                  <p>Total Amount: R{numberOfBookedSeats * seatPrice}</p>
                </section>

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

                <section>
                  <button className="mainBtn infoBtn dialogBtn" onClick={handlePaystackPayment}>
                    Book seats
                  </button>
                  <button className="mainBtn infoBtn dialogBtn" onClick={() => { navigate(-1); }}>
                    Go back to events
                  </button>
                </section>

              </main>
            </section>
          </section>
        </main>
      </div>
    </>
  );
};

export default SeatBooking;
