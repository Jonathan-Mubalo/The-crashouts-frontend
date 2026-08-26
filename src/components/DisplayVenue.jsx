import React from "react";
import "./DisplayVenue.css";

const DisplayVenue = () => {

    return (
        <div className="venue-overlay">

            <div className="venue-details-panel">

                <div className="venue-details-header">

                    <div>
                        <h2>Venue Details</h2>
                        <p>View your venue information</p>
                    </div>

                    <button className="close-details"  >
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 12C2 6.485 6.485 2 12 2s10 4.485 10 10s-4.485 10-10 10S2 17.515 2 12m1.5 0c0 4.685 3.815 8.5 8.5 8.5s8.5-3.815 8.5-8.5s-3.815-8.5-8.5-8.5S3.5 7.315 3.5 12m8.5-1.06l3.22-3.22l1.06 1.06L13.06 12l3.22 3.22l-1.06 1.06L12 13.06l-3.22 3.22l-1.06-1.06L10.94 12L7.72 8.78l1.06-1.06z" clipRule="evenodd"></path></svg></span>
                    </button>

                </div>

                <div className="venue-details-content">

                    <div className="details-section">

                        <h3>Venue Information</h3>

                        <div className="details-grid">

                            <div className="detail-item">
                                <span>Venue Name</span>
                                <strong>
                                    Grand Conference Hall
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Registration Number</span>
                                <strong>
                                    VEN-2026-001
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Contact Number</span>
                                <strong>
                                    067 123 4567
                                </strong>
                            </div>

                            <div className="detail-item">
                                <span>Address</span>
                                <strong>
                                    123 Main Street,
                                    Johannesburg, Gauteng
                                </strong>
                            </div>

                        </div>

                    </div>

                    <div className="details-section">

                        <h3>Venue Facilities</h3>

                        <div className="detail-item full-width">

                            <span>Facilities</span>

                            <strong>
                                WiFi, Projector, Air Conditioning,
                                Parking, Sound System,
                                Tables and Chairs
                            </strong>

                        </div>

                    </div>

                    <div className="details-section">

                        <h3>Seating Information</h3>

                        <div className="details-grid">

                            <div className="detail-item">
                                <span>Number of Seats</span>
                                <strong>200</strong>
                            </div>

                            <div className="detail-item">
                                <span>Number of Rows</span>
                                <strong>20</strong>
                            </div>

                            <div className="detail-item">
                                <span>Number of Columns</span>
                                <strong>25</strong>
                            </div>

                            <div className="detail-item">
                                <span>Venue Booking Price</span>
                                <strong>R 5,000</strong>
                            </div>

                        </div>

                    </div>

                    <div className="details-section">

                        <h3>Venue Images</h3>

                        <div className="venue-images">

                            <div className="image-placeholder">
                                Venue Image 1
                            </div>

                            <div className="image-placeholder">
                                Venue Image 2
                            </div>

                            <div className="image-placeholder">
                                Venue Image 3
                            </div>

                        </div>

                    </div>

                    <div className="details-section">

                        <h3>Documents</h3>

                        <div className="venue-documents">

                            <div className="document-item">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><g fill="#0c4196"><path d="M7 4a3 3 0 0 0 3 3h3v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2zm-2.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0-2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm6 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-6-2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"></path><path d="M13 6h-3a2 2 0 0 1-2-2V1z"></path></g></svg></span>
                                <span>
                                    Venue Registration.pdf
                                </span>
                            </div>

                            <div className="document-item">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><g fill="#0c4196"><path d="M7 4a3 3 0 0 0 3 3h3v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2zm-2.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0-2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm6 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-6-2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"></path><path d="M13 6h-3a2 2 0 0 1-2-2V1z"></path></g></svg></span>
                                <span>
                                    Business License.pdf
                                </span>
                            </div>

                            <div className="document-item">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><g fill="#0c4196"><path d="M7 4a3 3 0 0 0 3 3h3v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2zm-2.5 8a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0-2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm6 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm-6-2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z"></path><path d="M13 6h-3a2 2 0 0 1-2-2V1z"></path></g></svg></span>
                                <span>
                                    Venue Certificate.pdf
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DisplayVenue;