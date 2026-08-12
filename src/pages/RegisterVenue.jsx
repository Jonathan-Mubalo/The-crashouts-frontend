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
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Location"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="documents">Upload Documents</label>
                <input
                  type="file"
                  id="documents"
                  multiple
                  onChange={handleFileChange}
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
                <label htmlFor="noOfSeats">No. of Seats</label>
                <input
                  type="number"
                  id="noOfSeats"
                  placeholder="e.g 50"
                  value={formData.noOfSeats}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="noOfRows">No. of Rows</label>
                <input
                  type="number"
                  id="noOfRows"
                  placeholder="e.g 10"
                  value={formData.noOfRows}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="noOfColumns">No. of Columns</label>
                <input
                  type="number"
                  id="noOfColumns"
                  placeholder="e.g 10"
                  value={formData.noOfColumns}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-navigation" style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                <button type="button" onClick={prevStep} className="back-btn" style={{ flex: 1, backgroundColor: "#ccc" }}>
                  Previous
                </button>
                <button type="submit" className="register-btn" style={{ flex: 2 }}>
                  Register
                </button>
              </div>
            </>
          )}

        </form>
      </div>
    </>
  );
}

export default RegisterVenue;