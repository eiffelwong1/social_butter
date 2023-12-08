import {
  InfoWindow,
  Map,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import { SetStateAction, useEffect, useState } from "react";
import { BoundChangeListener } from "./mapFunction";
import { db } from "~/utils/db.server";
import { PrismaClient } from "@prisma/client";
import type { LoaderFunctionArgs } from "react-router";
import { useRouteLoaderData, useSearchParams } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const maxLat = parseInt(params.ne_lat ?? "");
  const maxLng = parseInt(params.ne_lng ?? "");
  const minLat = parseInt(params.sw_lat ?? "");
  const minLng = parseInt(params.sw_lng ?? "");

  if (!maxLat || !maxLng || !minLat || !minLng) {
    console.log("unable to parse map boundary");
    return [];
  }

  //fetch events from DB
  const results = db.event.findMany({
    where: {
      lat: {
        lt: maxLat,
        gt: minLat,
      },
      lng: {
        lt: maxLng,
        gt: minLng,
      },
    },
  });
  console.log("result: "+ results)
  return results;
}

export function MainMap({ provUserPos }: any) {
  const [userPos, setUserPos] = useState(provUserPos ?? { lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);
  const apiIsLoaded = useApiIsLoaded();
  const [curLatLngBounds, setCurLatLngBounds] = useState<google.maps.LatLngBounds|null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { GOOGLE_MAP_MAP_ID } = useRouteLoaderData("root")
  

  useEffect(() => {
    if(!curLatLngBounds){
      return
    }
    const params = new URLSearchParams();
    params.set("ne_lat", curLatLngBounds.getNorthEast().lat().toString());
    params.set("ne_lng", curLatLngBounds.getNorthEast().lng().toString());
    params.set("sw_lat", curLatLngBounds.getSouthWest().lat().toString());
    params.set("sw_lng", curLatLngBounds.getSouthWest().lng().toString());
    setSearchParams(params);
  }, [curLatLngBounds]);

  if (!apiIsLoaded) return <>Map is Loading</>;

  return (
    <>
      <Map
        id={"main"}
        center={userPos}
        zoom={3}
        minZoom={3}
        disableDefaultUI={true}
        mapId={GOOGLE_MAP_MAP_ID}
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
        <BoundChangeListener
          onBoundChange={(curLatLngBounds: SetStateAction<google.maps.LatLngBounds|null>) =>
            setCurLatLngBounds(curLatLngBounds)
          }
        ></BoundChangeListener>
      </Map>
    </>
  );
}
