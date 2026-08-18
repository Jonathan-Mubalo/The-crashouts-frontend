import './Footer.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Footer () {

    return (
        <>

            <div className='footContainer'>
                <div className='links'>
                    <Link className="navLink" to="/">Home</Link>
                    <Link className="navLink" to="/Events">Events</Link>   
                    <Link className="navLink" to="/SeatBooking">Bookings</Link>
                    <Link className="navLink" to="/UserProfile">Profile</Link>
                </div>
            </div>


        </>
    )
}

export default Footer