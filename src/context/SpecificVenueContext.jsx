import React,{ createContext, useState, useEffect } from 'react';



 export const VenueContext = createContext();

 const SpecificVenueContext = (props) => {

    // STATE VARIABLE THAT IS MEANT TO STORE THE SPECIFIC ID OF THE EVENT THAT SHOULD BE EDITTED SO THAT IT CAN BE COMPARED DURING THE FILTERING OF THE EVENTS
    const [ selectedVenueUpdate, setSelectedVenueUpdate ] = useState();
    
      // USEEFFECT THAT WILL BE USED TO GET A USERS PERSONAL VENUES
    
      useEffect(() => {
        const getMyPersonalVenues = async () => {
          try {
            const accessTokenEmail = JSON.parse(
              sessionStorage.getItem("accessToken"),
            );
    
            const response = await fetch(
              `//localhost:3000/myVenues/${accessTokenEmail}`,
            );
            const data = await response.json();
            if (response.status === 200) {
              return setMyVenues(() => {
                return data.message;
              });
            } else {
              alert(
                "Unable to collect all of the available properties, please try again later.",
              );
              return setMyVenues(() => {
                return [
                  {
                    _id: "N/A",
                    venueName: "N/A",
                    phoneNumber: "N/A",
                    registrationNo: "N/A",
                    address: "N/A",
                    facilities: "N/A",
                    numberOfSeats: N / A,
                    seatRows: 0,
                    seatColumns: 0,
                    seatArrangement: [
                      [
                        {
                          seat: "N/A",
                          isBooked: "N/A",
                        },
                      ],
                    ],
                    email: "N/A",
                    images: ["N/A"],
                    documents: ["N/A"],
                    createdAt: "N/A",
                  },
                ];
              });
            }
          } catch (error) {
            console.error(
              "Problem in the front end when getting personal venues",
              error,
            );
          }
        };
    
        getMyPersonalVenues();
      }, []);

    return ( 
        <>
        <VenueContext.Provider value={ {selectedVenueUpdate, setSelectedVenueUpdate} }>
        {props.children}
        </VenueContext.Provider>
        </>
     );
 }
  
 export default SpecificVenueContext;
