export const geocodeAddress = async (address, apiKey) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.status === "OK") {
    return data.results[0].geometry.location; // Returns { lat, lng }
  }
  throw new Error("Geocoding failed: " + data.status);
};