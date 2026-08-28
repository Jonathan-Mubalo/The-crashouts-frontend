import React, { useState } from "react";
import "./VenueUpdated.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VenueUpdated = () => {

    // =====================================
    // VENUE INFORMATION
    // =====================================

    const [VenueName, SetVenueName] = useState(
        "Grand Conference Hall"
    );

    const [PhoneNumber, SetPhoneNumber] = useState(
        "067 123 4567"
    );

    const [RegisterationNo, SetRegisterationNo] = useState(
        "VEN-2026-001"
    );

    const [FullAddress, SetFullAddress] = useState(
        "123 Main Street, Johannesburg, Gauteng"
    );

    // =====================================
    // SEATING INFORMATION
    // =====================================

    const [TotalSeats, SetTotalSeats] = useState("500");

    const [numberOfRows, setNumberOfRows] = useState("20");

    const [seatsPerRow, setSeatsPerRow] = useState("25");

    const [bookingPrice, setBookingPrice] = useState("5000");


    // =====================================
    // VENUE IMAGES
    // =====================================

    const [images, setImages] = useState([
        {
            id: 1,
            name: "venue-main.jpg",
            url: "/images/venue1.jpg"
        },

        {
            id: 2,
            name: "venue-inside.jpg",
            url: "/images/venue2.jpg"
        },

        {
            id: 3,
            name: "venue-stage.jpg",
            url: "/images/venue3.jpg"
        }
    ]);


    // =====================================
    // VENUE DOCUMENTS
    // =====================================

    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: "Venue Registration.pdf"
        },

        {
            id: 2,
            name: "Business License.pdf"
        },

        {
            id: 3,
            name: "Venue Certificate.pdf"
        }
    ]);


    // =====================================
    // UPLOAD IMAGES
    // =====================================

    const handleImageUpload = (event) => {

        const files = Array.from(event.target.files);

        const newImages = files.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setImages((previousImages) => [
            ...previousImages,
            ...newImages
        ]);

    };


    // =====================================
    // REMOVE IMAGE
    // =====================================

    const removeImage = (id) => {

        setImages((previousImages) =>
            previousImages.filter(
                (image) => image.id !== id
            )
        );

    };


    // =====================================
    // UPLOAD DOCUMENTS
    // =====================================

    const handleDocumentUpload = (event) => {

        const files = Array.from(event.target.files);

        const newDocuments = files.map((file, index) => ({
            id: Date.now() + index,
            name: file.name
        }));

        setDocuments((previousDocuments) => [
            ...previousDocuments,
            ...newDocuments
        ]);

    };


    // =====================================
    // REMOVE DOCUMENT
    // =====================================

    const removeDocument = (id) => {

        setDocuments((previousDocuments) =>
            previousDocuments.filter(
                (document) => document.id !== id
            )
        );

    };


    // =====================================
    // UPDATE VENUE
    // =====================================

    const handleSubmit = (event) => {

        event.preventDefault();

        const updatedVenue = {

            venueName: VenueName,

            phoneNumber: PhoneNumber,

            registrationNo: RegisterationNo,

            address: FullAddress,

            images: images,

            documents: documents,

            totalSeats: TotalSeats,

            numberOfRows: numberOfRows,

            seatsPerRow: seatsPerRow,

            bookingPrice: bookingPrice

        };


        console.log("Updated Venue:", updatedVenue);

        alert("Venue updated successfully!");

    };


    // =====================================
    // CANCEL
    // =====================================

    const handleCancel = () => {

        alert("Changes cancelled.");

    };


    // =====================================
    // RETURN
    // =====================================

    return (

        <>

            <Navbar />


            <div className="edit-venue-page">

                {/* =====================================
                    PAGE HEADER
                ===================================== */}

                <div className="edit-venue-header">

                    <div>

                        <h1>
                            Edit Venue
                        </h1>

                        <p>
                            Update your venue information
                        </p>

                    </div>

                </div>


                {/* =====================================
                    FORM
                ===================================== */}

                <form
                    className="edit-venue-form"
                    onSubmit={handleSubmit}
                >


                    {/* =====================================
                        VENUE INFORMATION
                    ===================================== */}

                    <section className="edit-section">

                        <div className="section-heading">

                            <h2>
                                Venue Information
                            </h2>

                            <p>
                                Update your venue details below.
                            </p>

                        </div>


                        <div className="form-grid">


                            {/* VENUE NAME */}

                            <div className="form-group">

                                <label>
                                    Venue Name
                                </label>

                                <input
                                    type="text"
                                    value={VenueName}
                                    onChange={(event) =>
                                        SetVenueName(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* PHONE NUMBER */}

                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    value={PhoneNumber}
                                    onChange={(event) =>
                                        SetPhoneNumber(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* REGISTRATION NUMBER */}

                            <div className="form-group">

                                <label>
                                    Registration No
                                </label>

                                <input
                                    type="text"
                                    value={RegisterationNo}
                                    onChange={(event) =>
                                        SetRegisterationNo(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* FULL ADDRESS */}

                            <div className="form-group full">

                                <label>
                                    Full Address
                                </label>

                                <textarea
                                    rows="4"
                                    value={FullAddress}
                                    onChange={(event) =>
                                        SetFullAddress(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </section>


                    {/* =====================================
                        VENUE IMAGES
                    ===================================== */}

                    <section className="edit-section">

                        <div className="section-heading">

                            <h2>
                                Venue Images
                            </h2>

                            <p>
                                Add new images or remove existing
                                images.
                            </p>

                        </div>


                        <div className="image-grid">


                            {/* EXISTING IMAGES */}

                            {images.map((image) => (

                                <div
                                    className="edit-image-card"
                                    key={image.id}
                                >

                                    <img
                                        src={image.url}
                                        alt={image.name}
                                    />


                                    <div className="image-card-footer">

                                        <span>
                                            {image.name}
                                        </span>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(
                                                    image.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))}


                            {/* UPLOAD IMAGE */}

                            <label className="upload-image-card">

                                <span className="upload-icon">
                                    +
                                </span>

                                <strong>
                                    Upload Image
                                </strong>

                                <small>
                                    PNG, JPG or JPEG
                                </small>


                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                />

                            </label>

                        </div>

                    </section>


                    {/* =====================================
                        VENUE DOCUMENTS
                    ===================================== */}

                    <section className="edit-section">

                        <div className="section-heading">

                            <h2>
                                Venue Documents
                            </h2>

                            <p>
                                Update your venue documents.
                            </p>

                        </div>


                        <div className="documents-list">


                            {/* EXISTING DOCUMENTS */}

                            {documents.map((document) => (

                                <div
                                    className="document-card"
                                    key={document.id}
                                >

                                    <div className="document-left">

                                        <div className="document-icon">
                                            📄
                                        </div>


                                        <div>

                                            <strong>
                                                {document.name}
                                            </strong>

                                            <span>
                                                Uploaded document
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeDocument(
                                                document.id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}


                            {/* UPLOAD DOCUMENT */}

                            <label className="upload-document">

                                <span>
                                    +
                                </span>


                                <div>

                                    <strong>
                                        Upload Documents
                                    </strong>

                                    <small>
                                        PDF, DOC or DOCX
                                    </small>

                                </div>


                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={
                                        handleDocumentUpload
                                    }
                                />

                            </label>

                        </div>

                    </section>


                    {/* =====================================
                        SEATING INFORMATION
                    ===================================== */}

                    <section className="edit-section">

                        <div className="section-heading">

                            <h2>
                                Seating Information
                            </h2>

                            <p>
                                Update the seating capacity
                                of your venue.
                            </p>

                        </div>


                        <div className="form-grid">


                            {/* TOTAL SEATS */}

                            <div className="form-group">

                                <label>
                                    Total Seats Available
                                </label>

                                <input
                                    type="number"
                                    value={TotalSeats}
                                    onChange={(event) =>
                                        SetTotalSeats(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* NUMBER OF ROWS */}

                            <div className="form-group">

                                <label>
                                    Number of Rows
                                </label>

                                <input
                                    type="number"
                                    value={numberOfRows}
                                    onChange={(event) =>
                                        setNumberOfRows(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* SEATS PER ROW */}

                            <div className="form-group">

                                <label>
                                    Number of Seats Per Row
                                </label>

                                <input
                                    type="number"
                                    value={seatsPerRow}
                                    onChange={(event) =>
                                        setSeatsPerRow(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            {/* BOOKING PRICE */}

                            <div className="form-group">

                                <label>
                                    Venue Booking Price
                                </label>


                                <div className="price-input">

                                    <span>
                                        R
                                    </span>

                                    <input
                                        type="number"
                                        value={bookingPrice}
                                        onChange={(event) =>
                                            setBookingPrice(
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =====================================
                        BUTTONS
                    ===================================== */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="update-button"
                        >
                            Update Venue
                        </button>

                    </div>


                </form>

            </div>


            <Footer />

        </>

    );
};

export default VenueUpdated;