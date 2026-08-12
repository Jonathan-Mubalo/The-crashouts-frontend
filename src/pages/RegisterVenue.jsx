import { useState } from "react";
import "./RegisterVenue.css";
import Navbar from "../components/Navbar";

function RegisterVenue () {
  const [formDate, setFormDate]=useState({
    venueName: "",
    registrationNo: "",
    address: "",
    images: null,
    documents: null,
    facilities: "",
    noOfSeats: "",
    noOfRows: "",
    noOfColumns: "",
  });

   const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({ ...prev, [id]: files }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Registration Data submitted:", formData);
    alert("Form Submitted successfully!");
  };


        return (
      <>
        <Navbar />
        <div className="register-page">
          <h1>Register Your Venue</h1>
          <form className="venue-form">

            {/* Venue name */}
            <div className="form-group">
              <label htmlFor="venueName">Venue Name</label>
              <input
                type="text"
                id="venueName"
                placeholder="Full Name"
              />
            </div>

            {/* Registration Number  */}
            <div className="form-group">
              <label htmlFor="registrationNo">Registration No</label>
              <input
                type="text"
                id="registrationNo"
                placeholder="PVT(Ltd)"
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Location"
              />
            </div>

            {/* Upload Images */}
            <div className="form-group">
              <label htmlFor="images">Upload Images</label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
            </div>

            {/* Upload Documents */}
            <div className="form-group">
              <label htmlFor="documents">Upload Documents</label>
              <input
                type="file"
                id="documents"
                multiple
              />
            </div>

            {/* Facilities */}
            <div className="form-group">
              <label htmlFor="facilities">Facilities</label>
              <textarea
                id="facilities"
                placeholder="Describe"
              ></textarea>
            </div>

            {/* Register Button */}
            <button type="submit" className="register-btn">
              Register
            </button>

            {/*  */}

          </form>
        </div>
      </> 
    );
}

export default RegisterVenue;