import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Contact.css'

function Contact () {

    return (
        <>
        <Navbar />
            <div className='contactForm'>
                    
                <h2>Contact Us!</h2>

                    <form className='formBoxTwo'>
                        
                        <div className='conDiv'>
                            <label className="inputLabel">Full Name: </label>
                            <br />
                            <input type='text' placeholder='Full Name'/>
                        </div>

                        <div className='conDiv'>
                            <label className="inputLabel">Email: </label>
                            <br />
                            <input type='email' placeholder='e.g johndoe@hotmail.com'/>
                        </div>

                        <div className='conDiv'>
                            <label className="inputLabel">Message: </label>
                            <br />
                            <input type='text' placeholder='Write your message here...' className='messageBox'/>
                        </div>

                        <button type='submit'>Send</button>

                    </form>
            </div>
        <Footer />
        </>
    )
}

export default Contact;