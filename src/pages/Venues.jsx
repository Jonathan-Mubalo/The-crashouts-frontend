import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "./Venues.css";
import GoogleMap from "../components/GoogleMap";

const Venues = () => {

    const [currentTab, setCurrentTab] = useState('search');
  
  // STATE VARIABLE THAT IS USED TO STORE ALL OF THE VENUES THAT ARE AVAILABLE
  const [allVenues, setAllVenues] = useState();

  // STATE VARIABLE THAT IS USED TO STORE ALL OF THE VENUES THAT ARE AVAILABLE
  const [myVenues, setMyVenues] = useState();

  // COLLECTING ALL OF THE AVAILABLE VENUES FROM THE VENUES COLLECTION
  useEffect(() => {

    const getAllVenues = async () => {

      try {
        const response = await fetch('//localhost:3000/allVenues');
        const data = await response.json();

        // MAKES SURE THAT THE PROPERTIES ARE ACTUALLY COLLECTED AND NO NULL VELUE IS RETURNED
        if (response.status === 200) {
          return setAllVenues(() => { return data.message });
        }
        else {
          alert("Unable to collect all of the available prperties, please try again later.")
          return setAllVenues(() => {
            return ([{

              _id: 'N/A',
              venueName: 'N/A',
              phoneNumber: 'N/A',
              registrationNo: 'N/A',
              address: 'N/A',
              facilities: 'N/A',
              numberOfSeats: N / A,
              seatRows: 0,
              seatColumns: 0,
              seatArrangement: [[{
                seat: "N/A",
                isBoked: "N/A"
              }]],
              email: 'N/A',
              images: [
                'N/A'
              ],
              documents: [
                'N/A'
              ],
              createdAt: 'N/A'


            }])
          });

        }
      } catch (error) {
        console.error("Problem in the front end when getting all of the venues", error);
      }
    };

    getAllVenues();

  }, []);

  // USEEFFECT THAT WILL BE USED TO GET A USERS PERSONAL VENUES
  useEffect(() => {
    const getMyPersonalVenues = async () => {
      try {

        const accessTokenEmail = JSON.parse(sessionStorage.getItem('accessToken'));

        const response = await fetch(`//localhost:3000/myVenues/${accessTokenEmail}`)
        const data = await response.json();

        if (response.status === 200) {
          return setMyVenues(() => { return data.message })
        }
        else {

          alert("Unable to collect all of the available prperties, please try again later.")
          return setMyVenues(() => {
            return ([{

              _id: 'N/A',
              venueName: 'N/A',
              phoneNumber: 'N/A',
              registrationNo: 'N/A',
              address: 'N/A',
              facilities: 'N/A',
              numberOfSeats: N / A,
              seatRows: 0,
              seatColumns: 0,
              seatArrangement: [[{
                seat: "N/A",
                isBoked: "N/A"
              }]],
              email: 'N/A',
              images: [
                'N/A'
              ],
              documents: [
                'N/A'
              ],
              createdAt: 'N/A'


            }])
          })

        }

      } catch (error) {
        console.error("Problem in the front end when getting personal venues", error);
      }
    };

    getMyPersonalVenues();

  }, [])

  return (
    <>
      <Navbar />

      <h1 className="venueTitle">All Venues</h1>

      <header className="venuesHeader">
  <div className="container venueFilterSection">

    <div>
      {currentTab === 'search' ? (
        <p>Browse available Venues, and explore venues.</p>
      ) : (
        <p>Venue History</p>
      )}
    </div>

    <nav>
      <button className={`nav_btn ${currentTab === 'search' ? 'active' : ''}`} onClick={() => setCurrentTab('search')} > Browse Venues </button>
      <button className={`nav_btn ${currentTab === 'history' ? 'active' : ''}`} onClick={() => setCurrentTab('history')} > Venue History </button>
    </nav>

  </div>
</header>
      
      <main className="venuePage">
{ allVenues && allVenues.map( (venue) => {


   return(   <div className="venueGrid" key={venue["_id"]}>
          <article className="venueCard">
            <div>
              <img src={venue.images[0]} />
            </div>

            <div className="cardContent">
              <div className="cardContentTop">
                <p className="placeholder placePrice">R900</p>
                <p className="placeholder placeRating">&#9733; 8.9</p>
              </div>

              <h2 className="placeholder placeholderTitle">{venue.venueName}</h2>

              <div className="venueDetails">
                <p className="venueLocation">{venue.address}</p>

           

              </div>
                 <div className="venuePageActions">
                  <button className="venueDetailsBtn" id={venue["_id"]}> Venue details </button>


                </div>
            </div>
          </article>
        </div>
 ) })
}
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
      <GoogleMap />
      </main>
    <Footer />
    </>
  );
};

export default Venues;
