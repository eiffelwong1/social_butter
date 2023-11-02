import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useLoaderData } from "@remix-run/react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import {
  GoogleMapsProvider,
  useGoogleMap,
} from "@ubilabs/google-maps-react-hooks";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Social Butter" },
    { name: "description", content: "Have fun together" },
  ];
};

export function loader() {
  const mapKey = process.env.GOOGLE_MAP_API_KEY;
  if (!mapKey) {
    throw new Error("GOOGLE_MAP_API_KEY must be set");
  }
  return {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
  };
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({debounce: 300});

  console.log(ready, status, value, data);

  const handleSelect = async (address: string) => {
    console.log("selected", address);
    setValue(address, false);
    clearSuggestions();

    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox name="z-40">
      <Combobox.Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        // onSubmit={}
      />
      <Combobox.Options>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <Combobox.Option key={place_id} value={description} onClick={()=>handleSelect(description)}>
              {description}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
};

function Map({ googleMapsAPIKey }: {googleMapsAPIKey:string}) {
  let userLng = 0;
  let userLat = 0;
  let center = useMemo(() => ({ lat: userLat, lng: userLng }), []);

  const [userPos, setUserPos] = useState({ lat: userLat, lng: userLng });
  const [selectedLoc, setSelectedLoc] = useState(null);
  // const [mapContainer, setMapContainer] = useState(null);

  navigator.geolocation.getCurrentPosition(
    yesLocationPermission,
    noLocationPermission
  );

  function yesLocationPermission(position: {
    coords: { longitude: number; latitude: number };
  }) {
    userLng = position.coords.longitude;
    userLat = position.coords.latitude;
    setUserPos({ lat: userLat, lng: userLng });
    console.log(selectedLoc);
    center = selectedLoc ?? { lat: userLat, lng: userLng };
  }

  function noLocationPermission(err: { code: number; message: string }) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // const mapOptions = {
  //   zoom: 10,
  //   center: {
  //     lat: 40.0,
  //     lng: -80.0,
  //   },
  // };

  return (
    <div>
      <PlacesAutocomplete setSelected={setSelectedLoc} />
{/* 
      <GoogleMapsProvider
        googleMapsAPIKey={googleMapsAPIKey}
        mapOptions={mapOptions}
        mapContainer={mapContainer}
      >

      </GoogleMapsProvider> */}

      {/* <div ref={(node) => setMapContainer(node)} className="flex-1 absolute h-full w-screen touch-pan-x touch-pan-y"></div> */}

      <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="flex-1 absolute h-full w-screen touch-pan-x touch-pan-y"
        >
          <MarkerF position={userPos} />
          {selectedLoc && <MarkerF position={selectedLoc}/>}
        </GoogleMap>
    </div>
  );
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: data.GOOGLE_MAP_API_KEY ?? "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Map...</div>;
  console.log(data.GOOGLE_MAP_API_KEY)
  return <Map googleMapsAPIKey={data.GOOGLE_MAP_API_KEY ?? ""} />;
}
