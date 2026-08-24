import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      setOptions({
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        v: "weekly",
      });

      const { Map } = await importLibrary("maps");

      new Map(mapRef.current, {
        center: {
          lat: -26.2041,
          lng: 28.0473,
        },
        zoom: 12,
      });
    }

    initMap();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}

export default GoogleMap