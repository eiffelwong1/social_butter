import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  useMap
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { PlacesAutocomplete } from "~/components/map/places";

export function MainMap({ googleMapsAPIKey, provUserPos }: any) {
  const map = useMap("main");
  const [userPos, setUserPos] = useState(provUserPos ?? { lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);

  // ask to get user location
  useEffect(() => {
    console.log("found user location")
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserPos({ lng: pos.coords.longitude, lat: pos.coords.latitude });
    });
  }, []);

  useEffect(() => {
    console.log("user position change", userPos, map)
    if (!map) return;
    console.log("panning")

    map.panTo(new google.maps.LatLng(userPos.lat, userPos.lng))
    console.log("finish")

    // here you can interact with the imperative maps API
  }, [map, userPos]);

  return (
    <APIProvider apiKey={googleMapsAPIKey} libraries={["places"]}>
      <PlacesAutocomplete setSelected={setUserPos}></PlacesAutocomplete>
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
