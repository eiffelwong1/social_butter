import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader"


const loader = new Loader({
    apiKey: "YOUR_API_KEY",
    version: "weekly",
    ...additionalOptions,
  });
  
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

function GoogleMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      // Initialize the Google Map
      const map = new google.maps.Map(document.getElementById("gmp-map"), {
        zoom: 4,
        center: {
            lat: 40.12150192260742,
            lng: -100.45039367675781
          },
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
      });

      // You can add markers or perform other actions here

    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default GoogleMap;