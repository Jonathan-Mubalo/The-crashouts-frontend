import React, { createContext, useState, useEffect } from 'react';
// import { EventContext } from './EventContext';

 export const EventContext = createContext();

const SpecificEvent = (props) => {

    const [storedEvents, setStoredEvents] = useState()
    const [allEventsData, setAllEventsData] = useState();

    useEffect(() => {
        const getAllEvents = async () => {
            try {

                const response = await fetch('http://localhost:3000/upcomingEvent',
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    }
                );
                const data = await response.json();
                // console.log(data.message)
                setAllEventsData(data.message);

            }
            catch (error) {
                console.error("There was a frontend error trying to get all of the events ", error)
            }
        }
        getAllEvents()
    }, [])

          
    return (
        <>
            <EventContext.Provider value={{ storedEvents, setStoredEvents, allEventsData, setAllEventsData }}>
                {props.children}
            </EventContext.Provider>
        </>
    );
}

export default SpecificEvent;