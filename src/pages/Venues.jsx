import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Venues.css";
// import './DisplayVenue.css';

const Venues = () => {
  const [currentTab, setCurrentTab] = useState("search");

  // STATE VARIABLE THAT IS USED TO STORE ALL OF THE VENUES THAT ARE AVAILABLE
  const [allVenues, setAllVenues] = useState();

  // DISPLAYING A VENUES DETAILS TO A MANAGER
  const [venueDetails, setVenueDetails] = useState();

  // STATE VARIABLE THAT IS USED TO STORE ALL OF THE VENUES THAT ARE AVAILABLE
  const [myVenues, setMyVenues] = useState();

  // FILTERED VENUE TO BOOK
  const [bookedVenue, setBookedVenue] = useState();

  // USEREF TO CONTROL THE VENUE DETAILS DISPLAY
  const venueDetailsDialog = useRef();

  // USEREF TO CONTROL THE VENUE BOOKING DIALOD DISPLAY
  const eventDialog = useRef();

  // Stores the events name that i being created
  const eventName = useRef();

  // Stores the events description
  const eventDescription = useRef();

  // Stores the price for booking a seat
  const eventSeatPrice = useRef();

  // Stores the date when the event will take place
  const eventDate = useRef();

  // MANAGERS CARD DETAILS WHEN OOKING AN EVENT
  const cardNumber = useRef();
  const cardExpireryDate = useRef();
  const cardCVV = useRef();

  // COLLECTING ALL OF THE AVAILABLE VENUES FROM THE VENUES COLLECTION

  useEffect(() => {
    const getAllVenues = async () => {
      try {
        const response = await fetch("//localhost:3000/allVenues");
        const data = await response.json();

        // MAKES SURE THAT THE PROPERTIES ARE ACTUALLY COLLECTED AND NO NULL VELUE IS RETURNED
        if (response.status === 200) {
          return setAllVenues(() => {
            return data.message;
          });
        } else {
          alert(
            "Unable to collect all of the available prperties, please try again later.",
          );
          return setAllVenues(() => {
            return [
              {
                _id: "N/A",
                venueName: "N/A",
                phoneNumber: "N/A",
                registrationNo: "N/A",
                address: "N/A",
                facilities: "N/A",
                numberOfSeats: N / A,
                seatRows: 0,
                seatColumns: 0,
                seatArrangement: [
                  [
                    {
                      seat: "N/A",
                      isBoked: "N/A",
                    },
                  ],
                ],
                email: "N/A",
                images: ["N/A"],
                documents: ["N/A"],
                createdAt: "N/A",
              },
            ];
          });
        }
      } catch (error) {
        console.error(
          "Problem in the front end when getting all of the venues",
          error,
        );
      }
    };

    getAllVenues();
  }, []);

  // USEEFFECT THAT WILL BE USED TO GET A USERS PERSONAL VENUES

  useEffect(() => {
    const getMyPersonalVenues = async () => {
      try {
        const accessTokenEmail = JSON.parse(
          sessionStorage.getItem("accessToken"),
        );

        const response = await fetch(
          `//localhost:3000/myVenues/${accessTokenEmail}`,
        );
        const data = await response.json();
        if (response.status === 200) {
          return setMyVenues(() => {
            return data.message;
          });
        } else {
          alert(
            "Unable to collect all of the available properties, please try again later.",
          );
          return setMyVenues(() => {
            return [
              {
                _id: "N/A",
                venueName: "N/A",
                phoneNumber: "N/A",
                registrationNo: "N/A",
                address: "N/A",
                facilities: "N/A",
                numberOfSeats: N / A,
                seatRows: 0,
                seatColumns: 0,
                seatArrangement: [
                  [
                    {
                      seat: "N/A",
                      isBooked: "N/A",
                    },
                  ],
                ],
                email: "N/A",
                images: ["N/A"],
                documents: ["N/A"],
                createdAt: "N/A",
              },
            ];
          });
        }
      } catch (error) {
        console.error(
          "Problem in the front end when getting personal venues",
          error,
        );
      }
    };

    getMyPersonalVenues();
  }, []);

  // FUNCTION USED TO DISPLAY THE DIALOG

  const displayDialog = (event) => {
    let selectedId = event.target.parentElement.id;
    console.log("Selected property's id: ", selectedId);

    const selectedVenue = allVenues.filter((item) => {
      return item["_id"] === selectedId;
    });

    setBookedVenue(() => {
      return selectedVenue[0];
    });
    eventDialog.current.showModal();
  };

  // ENDPOINT USED TO BOOK A VENUE

  const bookVenue = async (event) => {
    try {
      event.preventDefault();
      console.log("function is called");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
      const response = await fetch(`${API_URL}/bookVenue/${accessToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookedVenue,
          eventName: eventName.current.value,
          eventDescription: eventDescription.current.value,
          eventSeatPrice: eventSeatPrice.current.value,
          eventDate: eventDate.current.value,
        }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        return alert(data.message);
      } else {
        eventName.current.value = "";
        eventDescription.current.value = "";
        eventSeatPrice.current.value = "";
        eventDate.current.value = "";
        cardNumber.current.value = "";
        cardExpireryDate.current.value = "";
        cardCVV.current.value = "";
        alert(data.message);
        return eventDialog.current.close();
      }
    } catch (error) {
      console.error("Error occured while trying to book a venue: ", error);
    }
  };
  // FUNCTION USED TO DELETE A PERSONAL VENUE

  const deletePersonalVenue = async (event) => {
    try {
      // THE VENUE ID REPRESENTS THE VENUE NAME AND THE INDEX OF THE WHOLE VENUE IN THE ARRAY AS THE LAST CHARACTER OF THE ID
      const selectedVenueName = event.target.id;
      console.log(
        "selectedVenueName before the slicing effect: ",
        selectedVenueName,
      );

      // SPECIFICALLY GETTING THE VENUE INDEX FROM THE ID WITH THE VENUE NAME AND INDEX
      const venueIndex = selectedVenueName.split("").slice(-1).join("");
      console.log("Sliced index value: ", venueIndex);

      // SPECIFICALLY GETTING THE VENUE NAME FROM THE ID WITH THE VENUE NAME AND INDEX
      const venueName = selectedVenueName.split("").slice(0, -1).join("");
      console.log("selectedVenueName after the slicing effect: ", venueName);

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${API_URL}/removeMyVenue/${venueName}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.status !== 200) {
        return alert(data.message);
      } else {
        let venuesUpdate = myVenues.splice(venueIndex, 1);
        setMyVenues(() => {
          return [...myVenues];
        });
        console.log(data.message);
      }
    } catch (error) {
      console.error(
        "There was an error trying to delete your property: ",
        error,
      );
    }
  };

  // FUNCTION USED TO DISPLAY THE VENUE DETAILS DIALOG

  const displayVenueDetailsDialog = (event) => {
    const filteredVenue = allVenues.filter((venue) => {
      return venue["_id"] === event.target.parentElement.id;
    });
    console.log("filtered venue to display in the dialog: ", filteredVenue);
    setVenueDetails(() => {
      return filteredVenue;
    });
    venueDetailsDialog.current.showModal();
  };

  const closeVenueDetailsDialog = () => {
    venueDetailsDialog.current.close();
  };

  return (
    <>
      <div className="venuesPage">
        <header className="venuesHeader">
          <Navbar />

          <div className="venueHero">
            <span className="venueEyebrow">DISCOVER • BOOK • EXPERIENCE</span>

            <h1 className="venueTitle">Find the Perfect Venue</h1>

            <p className="venueHeroText">
              Browse available venues, explore their facilities, and find the
              perfect space for your next event.
            </p>

            <div className="venueNav">
              <button
                className={`venueTab ${currentTab === "search" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("search")}
              >
                Browse Venues
              </button>

              <button
                className={`venueTab ${currentTab === "history" ? "active" : ""
                  }`}
                onClick={() => setCurrentTab("history")}
              >
                Personal Venues
              </button>
            </div>
          </div>
        </header>

        <section>
          {/* CONDITIONALLY RENDERING THE PAGE */}
          <>
            {currentTab === "search" ? (
              <>
                <dialog className="eventBooking_dialog" ref={eventDialog}>
                  <form className="venue_eventBookingForm">
                    <h1>{bookedVenue && bookedVenue.venueName}</h1>
                    <h3>{bookedVenue && bookedVenue.address}</h3>
                    <label htmlFor="venue_EventName">Event Name</label>
                    <input
                      id="venue_EventName"
                      type="text"
                      placeholder="Enter Event name"
                      ref={eventName}
                      required
                    />
                    <label htmlFor="venue_EventDescription">
                      Provide a short description of the event taking place
                    </label>
                    <textarea
                      id="venue_EventDescription"
                      rows="5"
                      cols="50"
                      minLength="30"
                      placeholder="e.g a detailed description"
                      ref={eventDescription}
                      required
                    ></textarea>
                    <label htmlFor="seatPrice">Price per seat</label>
                    <input
                      id="venue_EventPrice"
                      type="number"
                      placeholder="100"
                      ref={eventSeatPrice}
                    />
                    <label htmlFor="venue_eventDate">
                      Select your event date
                    </label>
                    <input
                      type="date"
                      id="venue_eventDate"
                      ref={eventDate}
                      required
                    />
                    <h3> Payment details to book the venue</h3>
                    <p>
                      Venue booking price: R
                      <span className="venue_eventbookingPriceDisplay">
                        {bookedVenue && bookedVenue.venueBookingPrice}
                      </span>
                    </p>
                    <label htmlFor="venue_CardNumber">Card number</label>
                    <input
                      id="venue_CardNumber"
                      type="text"
                      placeholder="0000 0000 0000"
                      ref={cardNumber}
                      required
                      minLength="14"
                      maxLength="14"
                    />
                    <label htmlFor="venue_ExpireryDate">
                      Card expiration date
                    </label>
                    <input
                      id="venue_ExpireryDate"
                      type="text"
                      placeholder="YY/MM"
                      maxLength="5"
                      minLength="5"
                      ref={cardExpireryDate}
                      required
                    />
                    <label htmlFor="venue_CardCVV">CVV</label>
                    <input
                      type="number"
                      id="venue_CardCVV"
                      ref={cardCVV}
                      placeholder="000"
                      maxLength="3"
                      minLength="3"
                      required
                    />
                    <section>
                      <button
                        type="button"
                        className="event_venueBookingBtn"
                        onClick={bookVenue}
                      >
                        Book event
                      </button>
                      <button
                        type="button"
                        className="event_venueBookingBtn"
                        onClick={() => {
                          return eventDialog.current.close();
                        }}
                      >
                        Cancel
                      </button>
                    </section>
                  </form>

                  {/* <form className="venue_eventBookingForm">
          <h1>Event Title</h1>
          <h3>Event address</h3>
          <label htmlFor="venue_EventName">Event Name</label>
          <input id="venue_EventName" type="text" placeholder="Spiderman No way home" required />
          <label htmlFor="venue_EventDescription" >Provide a short description of the event taking place</label>
          <textarea id="venue_EventDescription" rows="5" cols="50" minLength="30" placeholder="Come and watch the premiere of spiderman brand new day; where he tries to live as the neighbourhoods friendly spiderman; but no one seems to remember him..." required ></textarea>
          <label htmlFor="seatPrice">Price per seat</label>
          <input id="venue_EventPrice" type="number" placeholder="100" />
          <label htmlFor="venue_eventDate">Select your event date</label>
          <input type="date" id="venue_eventDate" required />
          <h3> Payment details to book the venue</h3>
          <p>Venue booking price "Actual price"</p>
          <label htmlFor="venue_CardNumber">Card number</label>
          <input id="venue_CardNumber" type="text" placeholder="0000 0000 0000" required minLength="14" maxLength="14" />
          <label htmlFor="venue_ExpireryDate" >Card expiration date</label>
          <input id="venue_ExpireryDate" type="text" placeholder="YY/MM" required />
          <label htmlFor="venue_CardCVV">CVV</label>
          <input type="number" id="venue_CardCVV" placeholder="000" required />
          <section>
            <button type="submit" className="event_venueBookingBtn">Book event</button>
            <button type="submit" className="event_venueBookingBtn" onClick={() => { return eventDialog.current.close() }}>Cancel</button>
          </section>
        </form> */}
                </dialog>

                {/* DIALOG USED TO DISPLAY A SPECIFIC VENUE */}
                <dialog ref={venueDetailsDialog} className="venue-overlay">
                  {venueDetails &&
                    venueDetails.map((venue) => {
                      return (
                        <div className="venue-details-panel" key={venue["_id"]}>
                          <div className="venue-details-header">
                            <div>
                              <h2>Venue Details</h2>
                              <p>View your venue information</p>
                            </div>

                            <button className="close-details">
                              <span onClick={closeVenueDetailsDialog}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M2 12C2 6.485 6.485 2 12 2s10 4.485 10 10s-4.485 10-10 10S2 17.515 2 12m1.5 0c0 4.685 3.815 8.5 8.5 8.5s8.5-3.815 8.5-8.5s-3.815-8.5-8.5-8.5S3.5 7.315 3.5 12m8.5-1.06l3.22-3.22l1.06 1.06L13.06 12l3.22 3.22l-1.06 1.06L12 13.06l-3.22 3.22l-1.06-1.06L10.94 12L7.72 8.78l1.06-1.06z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                          </div>

                          <div className="venue-details-content">
                            <div className="details-section">
                              <h3>Venue Information</h3>
                              { }{" "}
                              <div className="details-grid">
                                <div className="detail-item">
                                  <span>Venue Name</span>
                                  <strong>{venue.venueName}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Registration Number</span>
                                  <strong>{venue.registrationNo}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Contact Number</span>
                                  <strong>{venue.phoneNumber}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Address</span>
                                  <strong>{venue.address}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Venue Facilities</h3>

                              <div className="detail-item full-width">
                                <span>Facilities</span>

                                <strong>{venue.facilities}</strong>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Seating Information</h3>

                              <div className="details-grid">
                                <div className="detail-item">
                                  <span>Number of Seats</span>
                                  <strong>{venue.numberOfSeats}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Number of Rows</span>
                                  <strong>{venue.seatRows}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Number of Columns</span>
                                  <strong>{venue.seatColumns}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Venue Booking Price</span>
                                  <strong>R {venue.venueBookingPrice}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Venue Images</h3>

                              <div className="venue-images">
                                {venue.images.map((img, index) => {
                                  return (
                                    <div
                                      className="image-placeholder"
                                      key={index}
                                    >
                                      <img
                                        src={img}
                                        className="venueDetailsImage"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Documents</h3>

                              <div className="venue-documents">
                                {venue.documents.map((document, index) => {
                                  return (
                                    <div className="document-item" key={index}>
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="2em"
                                          height="2em"
                                          viewBox="0 0 16 16"
                                        >
                                          <g fill="#0c4196">
                                            <path d="M7 4a3 3 0 0 0 3 3h3v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2zm-2.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0-2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm6 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-6-2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"></path>
                                            <path d="M13 6h-3a2 2 0 0 1-2-2V1z"></path>
                                          </g>
                                        </svg>
                                      </span>
                                      <a
                                        href={document}
                                        className="venueDocumentation"
                                      >
                                        {document
                                          .split("")
                                          .slice(0, 40)
                                          .join("")}
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </dialog>

                <main className="venuePage">
                  {allVenues &&
                    allVenues.map((venue) => {
                      return (
                        <div className="venueGrid" key={venue["_id"]}>
                          <article className="venueCard">
                            <div>
                              <img src={venue.images[0]} />
                            </div>

                            <div className="cardContent">
                              <div className="cardContentTop">
                                <p className="placeholder placePrice">
                                  R{venue.venueBookingPrice}
                                </p>
                                <p className="placeholder placeRating">
                                  &#9733; 8.9
                                </p>
                              </div>

                              <h2 className="placeholder placeholderTitle">
                                {venue.venueName}
                              </h2>

                              <div className="venueDetails">
                                <p className="venueLocation">{venue.address}</p>
                              </div>
                              <div
                                className="venuePageActions"
                                id={venue["_id"]}
                              >
                                <button
                                  className="venueDetailsBtn"
                                  onClick={displayDialog}
                                >
                                  {" "}
                                  Book venue{" "}
                                </button>
                                <button
                                  className="venueDetailsBtn"
                                  onClick={displayVenueDetailsDialog}
                                >
                                  {" "}
                                  Venue details{" "}
                                </button>
                              </div>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  {/* <div className="venueGrid">
          <article className="venueCard">
            <div>
              <img src="https://images.squarespace-cdn.com/content/v1/64d31e9c57de6b03a09da696/abe71d5c-0319-43e7-bf67-36f9aa95652c/The_Pavilion_3.jpg" />
            </div>

            <div className="cardContent">
              <div className="cardContentTop">
                <p className="placeholder placePrice">R900</p>
                <p className="placeholder placeRating">&#9733; 8.9</p>
              </div>

              <h2 className="placeholder placeholderTitle">The Pavilion</h2>

              <div className="venueDetails">
                <p className="venueLocation">The Pavilion Shopping Centre, Jack Martens Drive Westville, 3611</p>

           

              </div>
                 <div className="venuePageActions">
                  <button className="venueDetailsBtn"> Venue details </button>


                </div>
            </div>
          </article>
        </div>

        <div className="venueGrid">
          <article className="venueCard">
            <div>
              <img src="https://images.squarespace-cdn.com/content/v1/64d31e9c57de6b03a09da696/abe71d5c-0319-43e7-bf67-36f9aa95652c/The_Pavilion_3.jpg" />
            </div>

            <div className="cardContent">
              <div className="cardContentTop">
                <p className="placeholder placePrice">R900</p>
                <p className="placeholder placeRating">&#9733; 8.9</p>
              </div>

              <h2 className="placeholder placeholderTitle">The Pavilion</h2>

              <div className="venueDetails">
                <p className="venueLocation">The Pavilion Shopping Centre, Jack Martens Drive Westville, 3611</p>

                <button className="bookNowBtn">Book Now</button>
              </div>
            </div>
          </article>
        </div>


        <div className="venueGrid">
          <article className="venueCard">
            <div>
              <img src="https://images.squarespace-cdn.com/content/v1/64d31e9c57de6b03a09da696/abe71d5c-0319-43e7-bf67-36f9aa95652c/The_Pavilion_3.jpg" />
            </div>

            <div className="cardContent">
              <div className="cardContentTop">
                <p className="placeholder placePrice">R900</p>
                <p className="placeholder placeRating">&#9733; 8.9</p>
              </div>

              <h2 className="placeholder placeholderTitle">The Pavilion</h2>

              <div className="venueDetails">
                <p className="venueLocation">The Pavilion Shopping Centre, Jack Martens Drive Westville, 3611</p>

                <button className="bookNowBtn">Book Now</button>
              </div>
            </div>
          </article>
        </div> */}
                </main>
                <Footer />
              </>
            ) : (
              <>
                {/* DIALOG USED TO DISPLAY A SPECIFIC VENUE */}
                <dialog ref={venueDetailsDialog} className="venue-overlay">
                  {venueDetails &&
                    venueDetails.map((venue) => {
                      return (
                        <div className="venue-details-panel" key={venue["_id"]}>
                          <div className="venue-details-header">
                            <div>
                              <h2>Venue Details</h2>
                              <p>View your venue information</p>
                            </div>

                            <button className="close-details">
                              <span onClick={closeVenueDetailsDialog}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M2 12C2 6.485 6.485 2 12 2s10 4.485 10 10s-4.485 10-10 10S2 17.515 2 12m1.5 0c0 4.685 3.815 8.5 8.5 8.5s8.5-3.815 8.5-8.5s-3.815-8.5-8.5-8.5S3.5 7.315 3.5 12m8.5-1.06l3.22-3.22l1.06 1.06L13.06 12l3.22 3.22l-1.06 1.06L12 13.06l-3.22 3.22l-1.06-1.06L10.94 12L7.72 8.78l1.06-1.06z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                          </div>

                          <div className="venue-details-content">
                            <div className="details-section">
                              <h3>Venue Information</h3>

                              <div className="details-grid">
                                <div className="detail-item">
                                  <span>Venue Name</span>
                                  <strong>{venue.venueName}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Registration Number</span>
                                  <strong>{venue.registrationNo}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Contact Number</span>
                                  <strong>{venue.phoneNumber}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Address</span>
                                  <strong>{venue.address}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Venue Facilities</h3>

                              <div className="detail-item full-width">
                                <span>Facilities</span>

                                <strong>{venue.facilities}</strong>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Seating Information</h3>

                              <div className="details-grid">
                                <div className="detail-item">
                                  <span>Number of Seats</span>
                                  <strong>{venue.numberOfSeats}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Number of Rows</span>
                                  <strong>{venue.seatRows}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Number of Columns</span>
                                  <strong>{venue.seatColumns}</strong>
                                </div>

                                <div className="detail-item">
                                  <span>Venue Booking Price</span>
                                  <strong>R {venue.venueBookingPrice}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Venue Images</h3>

                              <div className="venue-images">
                                {venue.images.map((img, index) => {
                                  return (
                                    <div
                                      className="image-placeholder"
                                      key={index}
                                    >
                                      <img
                                        src={img}
                                        className="venueDetailsImage"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="details-section">
                              <h3>Documents</h3>

                              <div className="venue-documents">
                                {venue.documents.map((document, index) => {
                                  return (
                                    <div className="document-item" key={index}>
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="2em"
                                          height="2em"
                                          viewBox="0 0 16 16"
                                        >
                                          <g fill="#0c4196">
                                            <path d="M7 4a3 3 0 0 0 3 3h3v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2zm-2.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0-2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm6 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-6-2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"></path>
                                            <path d="M13 6h-3a2 2 0 0 1-2-2V1z"></path>
                                          </g>
                                        </svg>
                                      </span>
                                      <a
                                        href={document}
                                        className="venueDocumentation"
                                      >
                                        {document
                                          .split("")
                                          .slice(0, 40)
                                          .join("")}
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </dialog>

                <main className="venuePage">
                  {myVenues &&
                    myVenues.map((venue, index) => {
                      return (
                        <div className="venueGrid" key={venue["_id"]}>
                          <article className="venueCard">
                            <div>
                              <img src={venue.images[0]} />
                            </div>

                            <div className="cardContent">
                              <div className="cardContentTop">
                                <p className="placeholder placePrice">
                                  R{venue.venueBookingPrice}
                                </p>
                                <p className="placeholder placeRating">
                                  &#9733; 8.9
                                </p>
                              </div>

                              <h2 className="placeholder placeholderTitle">
                                {venue.venueName}
                              </h2>

                              <div className="venueDetails">
                                <p className="venueLocation">{venue.address}</p>
                              </div>
                              <div
                                className="venuePageActions"
                                id={venue["_id"]}
                              >
                                <button
                                  className="personalVenueDetailsBtn"
                                  onClick={displayVenueDetailsDialog}
                                >
                                  
                                  Venue details
                                </button>
                                <section className="personalVenuesEditsBtnsContainer">
                                  <button
                                    className="updateVenueBtn"
                                    id={venue["_id"]}
                                  >
                                     Update venue
                                  </button>
                                  <button
                                    className="deleteVenueBtn"
                                    id={`${venue.venueName}${index}`}
                                    onClick={deletePersonalVenue}
                                  >
                                     Delete venue
                                  </button>
                                </section>
                              </div>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                </main>
                <Footer />
              </>
            )}
          </>
        </section>
      </div>
    </>
  );
};

export default Venues;
