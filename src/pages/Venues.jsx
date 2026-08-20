import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "./Venues.css";

const Venues = () => {

  
  
  
  
  
  
  const [currentTab, setCurrentTab] = useState('search');

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
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

              <div className="venueActions">
                  <button className="bookNowBtn"> Book Now </button>

                  <button className="editBtn"> Edit </button>

                  <button className="deleteBtn"> Delete </button>
                </div>

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
        </div>

      </main>
    <Footer />
    </>
  );
};

export default Venues;
