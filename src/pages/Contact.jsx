import React,{ useRef } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Contact.css'

function Contact() {

    const fullName = useRef();
    const email = useRef();
    const message = useRef();

    const submitForm = async () =>{

        const response = await fetch('//localhost:3000/postForms',{
            method:'POST',
            headers:{'Content-Type': "application/json"},
            body:JSON.stringify({
                fullName: fullName.current.value,
                email: email.current.value,
               message: message.current.value
            })
        })

        const data = await response.json();

        return ( response.status === 200 ) ? alert(data.message): alert(data.message);

    }
    return (
        <>
            <Navbar />

            <main className="contactPage">
                <section className="contactForm">
                    <div className="contactHeader">
                        <h2>Contact Us</h2>
                        <p>Have a question? We'd love to hear from you.</p>
                    </div>

                    <form className="formBoxTwo" action={submitForm}>
                        <div className="conDiv">
                            <label className="inputLabel" htmlFor="fullName">Full Name</label>

                            <input id="fullName" className="inputBox" type="text" placeholder="John Doe" />
                        </div>

                        <div className="conDiv">
                            <label className="inputLabel" htmlFor="email">Email Address</label>

                            <input id="email" className="inputBox" type="email" placeholder="johndoe@hotmail.com"/>
                        </div>

                        <div className="conDiv">
                            <label className="inputLabel" htmlFor="message">Message</label>

                            <textarea id="message" className="inputBox messageBox" placeholder="Write your message here..." rows="5"/>
                        </div>

                        <button type="submit" className="submitBtn">Send Message<span>&#x2192;</span></button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default Contact
