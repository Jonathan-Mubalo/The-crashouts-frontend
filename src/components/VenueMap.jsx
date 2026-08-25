// src/components/VenueMap.jsx
import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { geocodeAddress } from "../services/googleMapsService";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function VenueMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [markerPosition, setMarkerPosition] = useState({ lat: -30.8578, lng: 30.3734 }); // Default fallback (e.g., Margate, SA)
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -30.8578, lng: 30.3734 });

  // 1. Get User's Current Location on load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          setMapCenter(pos); // Center map on user
        },
        () => {
          console.warn("Geolocation permission denied or unavailable.");
        }
      );
    }
  }, []);

  // 2. Handle Venue Address Search & Geocoding
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const location = await geocodeAddress(searchQuery, API_KEY);
      setMarkerPosition(location);
      setMapCenter(location); // Move map view to searched venue
    } catch (error) {
      alert("Could not find the address. Please try again.");
      console.error(error);
    }
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>Venue Finder</h2>
        
        {/* Search Form for Places/Geocoding */}
        <form onSubmit={handleSearch} style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venue address..."
            style={{ padding: "8px", width: "70%", marginRight: "10px" }}
          />
          <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
        </form>

        {/* Google Map Container */}
        <div style={{ height: "450px", width: "100%" }}>
          <Map
            center={mapCenter}
            zoom={14}
            mapId="DEMO_MAP_ID" // Required for advanced markers, or use default
            style={{ width: "100%", height: "100%" }}
          >
            {/* Marker for Searched Venue */}
            <Marker position={markerPosition} title="Searched Venue" />

            {/* Marker for User's Current Location */}
            {userLocation && (
              <Marker 
                position={userLocation} 
                title="Your Location" 
                // You can pass custom pin configurations or icons here if needed
              />
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}