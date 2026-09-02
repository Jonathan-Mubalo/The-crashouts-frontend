import React,{ useRef } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Contact.css'
import { Link } from 'react-router-dom';
import emailjs from "@emailjs/browser";

function Contact() {

    // const fullName = useRef();
    // const email = useRef();
    // const message = useRef();

    const form = useRef()

    const submitForm = async (e) =>{
        e.preventDefault();

        // const response = await fetch('//localhost:3000/postForms',{
        //     method:'POST',
        //     headers:{'Content-Type': "application/json"},
        //     body:JSON.stringify({
        //         fullName: fullName.current.value,
        //         email: email.current.value,
        //        message: message.current.value
        //     })
        // })

        // const data = await response.json();

        // return ( response.status === 200 ) ? alert(data.message): alert(data.message);

        try {
        // Email to you
        await emailjs.sendForm(
            "service_vi5kgcl",
            "template_3lifeoo",
            form.current,
            {
                publicKey: "tBEaJB7Fm24vpN3TS",
            }
        );

        // Confirmation email to customer
        await emailjs.sendForm(
            "service_vi5kgcl",
            "template_kewqhue",
            form.current,
            {
                publicKey: "tBEaJB7Fm24vpN3TS",
            }
        );

        alert("Message sent successfully!");

        form.current.reset();

    } catch (error) {
        console.error("EmailJS Error:", error);
        alert("Something went wrong.");
    }
};

    return (
        <>
            <Navbar />

            <main className="contactPage">

                <section className="contactHero">
                    <div className="heroOverlay"></div>

                    <div className="contactHeroContent">
                        <h1>Contact Us</h1>

                        <div className="breadcrumb">
                            <span><Link to="/Home">Home</Link></span>
                            <span>/</span>
                            <span>Contact Us</span>
                        </div>
                    </div>
                </section>

                <section className="contactContent">

                    <div className="contactIntro">
                        <span className="sectionLabel">Contact Us</span>

                        <h2>
                            Let's Celebrate
                            <br />
                            Something Great
                        </h2>

                        <p>
                            Have a event in mind or want to attend an event?
                            We'd love to hear from you. Send us a message and
                            let's create something memorable!
                        </p>

                        <div className="contactDetails">

                            <div className="contactDetail">
                                <span className="detailNumber">01</span>
                                <div>
                                    <h4>Our Location</h4>
                                    <p>72 Marlborough Road, Springfield</p>
                                </div>
                            </div>

                            <div className="contactDetail">
                                <span className="detailNumber">02</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p>+27 61 908 1742</p>
                                </div>
                            </div>

                            <div className="contactDetail">
                                <span className="detailNumber">03</span>
                                <div>
                                    <h4>Email</h4>
                                    <p>eugenieekazi@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="contactForm">

                        <div className="formHeader">
                            <span className="sectionLabel">Get In Touch</span>
                            <h3>Send Us A Message</h3>
                        </div>

                        <form ref={form} className="formBoxTwo" onSubmit={submitForm}>

                            <div className="conDiv">
                                <label className="inputLabel" htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    className="inputBox"
                                    type="text"
                                    placeholder="John Doe"
                                    name="from_name"
                                />
                            </div>

                            <div className="conDiv">
                                <label className="inputLabel" htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    className="inputBox"
                                    type="email"
                                    placeholder="johndoe@nomail.com"
                                    name="from_email"
                                />
                            </div>

                            <div className="conDiv messageDiv">
                                <label className="inputLabel" htmlFor="message">
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    className="inputBox messageBox"
                                    placeholder="Write your message here..."
                                    rows="5"
                                    name="message"
                                />
                            </div>

                            <button type="submit" className="submitBtnForm">
                                Send Message
                                <span>&#x2192;</span>
                            </button>

                        </form>
                    </div>

                </section>

                <section className="contactCta">
                    <div className="ctaContent">
                        <span className="sectionLabel">Book Now</span>

                        <h2>
                            We Are Always Ready
                            <br />
                            To Celebrate Something Amazing
                        </h2>

                        <button className="ctaButton">
                            <Link to="/Events">Get Started</Link>
                            <span>&#x2192;</span>
                        </button>
                    </div>
                </section>

            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Contact
