import React from 'react';
import Navbar from '../components/Navbar';
import './Venues.css'


const Venues = () => {
    const Venues = [
        {id:1, name: "The Glen", image: "https://thumbs.dreamstime.com/z/glen-shopping-centre-glen-waverley-melbourne-major-mall-eastern-suburb-australia-situated-54941528.jpg?w=992", address: "Cnr Orpen Rd &, Letaba Rd, Oakdene, Johannesburg, 2001" },
        {id:2, name: "Emperors Palace", image: "https://imagenesyogonet.b-cdn.net/data/imagenes/2017/11/27/16390/1625228222-emperors-palace-sudafrica-04.jpg", address: "64 Jones Road, Kempton Park Johannesburg, South Africa"},
        {id:3, name: "The Pavilion", image: "https://images.squarespace-cdn.com/content/v1/64d31e9c57de6b03a09da696/abe71d5c-0319-43e7-bf67-36f9aa95652c/The_Pavilion_3.jpg", address: "The Pavilion Shopping Centre Jack Martens Drive Westville 3611"},
    ]

    return ( 
    <>
        <Navbar />

        <div className=''>

        </div>
    </> 
    );
}
 
export default Venues;