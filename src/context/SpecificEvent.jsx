import React, { createContext, useState, useEffect } from 'react';
// import { EventContext } from './EventContext';

 export const EventContext = createContext();

const SpecificEvent = (props) => {

    const [storedEvent, setStoredEvent] = useState()
    const [allEventsData, setAllEventsData] = useState();

    useEffect(() => {
    const getAllEvents = async () => {
        try {
            const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "");
            const response = await fetch(`${API_URL}/upcomingEvent`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setAllEventsData(data.message);

        }
        catch (error) {
            console.error("There was a frontend error trying to get all of the events ", error);
        }
    }
    getAllEvents();
}, []);

          
    return (
        <>
            <EventContext.Provider value={{ storedEvent, setStoredEvent, allEventsData, setAllEventsData }}>
                {props.children}
            </EventContext.Provider>
        </>
    );
}

export default SpecificEvent;