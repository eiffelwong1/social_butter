import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useLoaderData } from "@remix-run/react";

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

function Map() {
  var userLng = 0;
  var userLat = 0;
  
  navigator.geolocation.getCurrentPosition(function (position) {
    userLng = position.coords.longitude;
    userLat = position.coords.latitude;
  });

  const center = useMemo(() => ({ lat: userLat, lng: userLng }), []);

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerClassName="flex-1 absolute h-full w-screen touch-pan-x touch-pan-y"
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: data.GOOGLE_MAP_API_KEY ?? "",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
