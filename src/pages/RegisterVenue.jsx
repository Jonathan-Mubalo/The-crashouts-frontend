import React, { useState, useRef, useEffect } from "react";
import "./RegisterVenue.css";
import Navbar from "../components/Navbar";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

function RegisterVenue() {

  // Needed to change the useState name from "formDate" to "formData" because the forms are using "formData" but the useState created was named "formDate"
  const [formData, setFormData] = useState({
    venueName: "",
    registrationNo: "",
    number: "",
    address: "",
    images: [],
    documents: [],
    facilities: "",
    noOfSeats: "",
    noOfRows: "",
    noOfColumns: "",
    venueBookingPrice: ""
  });

  // Added the useState after reviewing the merged code and the pull request and realising that setState was not present at all.
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({ ...prev, [id]: files }));
  };

  const handlePlaceSelect = (place) => { 
    console.log("FULL GEOAPIFY PLACE:", place); 
    console.log("GEOAPIFY PROPERTIES:", place?.properties); 
    console.log("FORMATTED ADDRESS:", place?.properties?.formatted); 
    if (place?.properties?.formatted) { setFormData((prev) => 
      ({ ...prev, address: place.properties.formatted, })); 
    } 
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("venueName", formData.venueName)
    submissionData.append("phoneNumber", formData.number)
    submissionData.append("registrationNo", formData.registrationNo)
    submissionData.append("address", formData.address)
    submissionData.append("facilities", formData.facilities)
    submissionData.append("numberOfSeats", parseInt(formData.noOfSeats))
    submissionData.append("seatRows", parseInt(formData.noOfRows))
    submissionData.append("seatColumns", parseInt(formData.noOfColumns))
    submissionData.append("venueBookingPrice", parseInt(formData.venueBookingPrice))
    for (let image of formData.images) {
      submissionData.append("images", image);
    }
    for (let document of formData.documents) {
      submissionData.append("documents", document);
    }

    // if( submissionData.documents.length === 0 || submissionData.images.length === 0 ){
    //   alert("Please upload the necessary documents and property images")
    // }

    const accessTokenEmail = JSON.parse(sessionStorage.getItem("accessToken"));

   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const response = await fetch(`${API_URL}/newVenue/${accessTokenEmail}`, {
  method: "POST",
  body: submissionData,
});

    const data = await response.json();

    const actualSubmission = submissionData.entries;
    for (const [key, value] of submissionData.entries()) {
      console.log(key, value);
    }
    console.log("Final Registration Data submitted:", formData);
    console.log("Object sent to the backend: ", submissionData.entries(([key, value]) => { return console.log(key, value) }))
    alert("Form Submitted successfully!");

    // CLEARING THE FORM ONCE A PROPERTY HAS BEEN CREATED
    setFormData(() => {
      return ({
        venueName: "",
        registrationNo: "",
        number: "",
        address: "",
        images: [],
        documents: [],
        facilities: "",
        noOfSeats: "",
        noOfRows: "",
        noOfColumns: "",
        venueBookingPrice: ""
      }
      )
    });

  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <h1>Register Your Venue</h1>
        <div className="registerVenueDiv">
          <form className="venue_form" onSubmit={step === 2 ? handleSubmit : nextStep}>
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="venueName">Venue Name</label>
                  <input
                    type="text"
                    id="venueName"
                    placeholder="Full Name"
                    value={formData.venueName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Number">Phone Number</label>
                  <input
                    type="tel"
                    maxLength="10"
                    minLength="10"
                    min="0"
                    id="number"
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="registrationNo">Registration No</label>
                  <input
                    type="text"
                    id="registrationNo"
                    placeholder="PVT(Ltd)"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Full Address</label>
                  
                  {/* Geoapify Autocomplete integration wrapping context */}
                  <GeoapifyContext apiKey={GEOAPIFY_API_KEY}>
                    <GeoapifyGeocoderAutocomplete
                      placeholder="8 Albert street Townsview"
                      value={formData.address}
                      placeSelect={handlePlaceSelect}
                      onUserInput={(userInput) => {
                        // Allow typing fallback to state if user clears or types custom text
                        setFormData((prev) => ({ ...prev, address: userInput }));
                      }}
                    />
                  </GeoapifyContext>
                </div>

                <div className="form-group">
                  <label htmlFor="images">Upload Images</label>
                  <input className="RegisterFile"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="documents">Upload Documents</label>
                  <input className="RegisterFile"
                    type="file"
                    id="documents"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="facilities">Facilities</label>
                  <textarea
                    id="facilities"
                    placeholder="Describe"
                    value={formData.facilities}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="register-btn">
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="noOfSeats">Total seats available</label>
                  <input
                    type="number"
                    id="noOfSeats"
                    placeholder="e.g 50"
                    value={formData.noOfSeats}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="noOfRows">Number of Rows</label>
                  <input
                    type="number"
                    id="noOfRows"
                    placeholder="e.g 10"
                    value={formData.noOfRows}
                    onChange={handleChange}
                    required
                    min="1"
                    max="26"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="noOfColumns">Number of seats per row</label>
                  <input
                    type="number"
                    id="noOfColumns"
                    placeholder="e.g 10"
                    value={formData.noOfColumns}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="venueBookingPrice">Venue booking price</label>
                  <input
                    type="number"
                    id="venueBookingPrice"
                    placeholder="e.g 25000"
                    value={formData.venueBookingPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-navigation" style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                  <button type="button" onClick={prevStep} className="back-btn" >
                    Previous
                  </button>
                  <button type="submit" className="register-btn" >
                    Register
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <main>

        </main>
      </div>
    </>
  );
}

export default RegisterVenue