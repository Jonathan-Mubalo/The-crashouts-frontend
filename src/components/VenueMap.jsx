// src/components/VenueMap.jsx
import React, { useState, useEffect, useRef } from "react";
import { APIProvider, Map, Marker, useMapsLibrary } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Separate Autocomplete Input Component to safely load the Places library
function PlaceAutocomplete({ onPlaceSelect }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    // Initialize Google Places Autocomplete widget
    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
    });
  }, [placeAutocomplete, onPlaceSelect]);

  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search venue address (e.g., V&A Waterfront)..."
        style={{ padding: "10px", width: "100%", maxWidth: "400px", fontSize: "16px" }}
      />
    </div>
  );
}

export default function VenueMap() {
  const [markerPosition, setMarkerPosition] = useState({ lat: -30.8578, lng: 30.3734 }); // Default fallback
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
        },
        () => {
          console.warn("Geolocation permission denied or unavailable.");
        }
      );
    }
  }, []);

  // 2. Handle Place Selection from Autocomplete
  const handlePlaceSelect = (place) => {
    if (!place.geometry || !place.geometry.location) {
      alert("No details available for input: " + place.name);
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const newPos = { lat, lng };

    setMarkerPosition(newPos);
    setMapCenter(newPos); // Move map view to selected venue
  };

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2>Venue Finder</h2>
        
        {/* Google Places Autocomplete Search Bar */}
        <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />

        {/* Google Map Container */}
        <div style={{ height: "450px", width: "100%" }}>
          <Map
            center={mapCenter}
            zoom={14}
            mapId="DEMO_MAP_ID"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Marker for Searched/Selected Venue */}
            <Marker position={markerPosition} title="Searched Venue" />

            {/* Marker for User's Current Location */}
            {userLocation && (
              <Marker 
                position={userLocation} 
                title="Your Location"
              />
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}