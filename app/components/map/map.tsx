import { InfoWindow, Map, useMap } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

export function MainMap({ provUserPos }: any) {
  const map = useMap("main");
  const [userPos, setUserPos] = useState(provUserPos ?? { lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);
  const apiIsLoaded = useApiIsLoaded();

  if (!apiIsLoaded) return <>Map is Loading</>;

  return (
    <>
      <Map
        id={"main"}
        center={userPos}
        zoom={3}
        minZoom={3}
        disableDefaultUI={true}
      >
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
    </>
  );
}
