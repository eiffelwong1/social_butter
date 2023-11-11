import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  useMap
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { PlacesAutocomplete, MapControl } from "~/components/map/places";

export function MainMap({ googleMapsAPIKey, provUserPos }: any) {
  const map = useMap("main");
  const [userPos, setUserPos] = useState(provUserPos ?? { lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);

  // look for a way to not use useLoadScript as it's a different library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey ?? "",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <APIProvider apiKey={googleMapsAPIKey} libraries={["places"]}>
      <PlacesAutocomplete></PlacesAutocomplete>
      <Map id={"main"} center={userPos} zoom={3} minZoom={3} disableDefaultUI={true}>
        <Marker position={userPos} onClick={() => setInfoOpen(true)}></Marker>

        {infoOpen && (
          <InfoWindow
            position={userPos}
            onCloseClick={() => setInfoOpen(false)}
          >
            <p>
              You are Located at long: {userPos.lng} lat: {userPos.lat}
            </p>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
