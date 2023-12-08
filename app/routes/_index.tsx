import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "react-router";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  useApiIsLoaded,
  useMap,
} from "@vis.gl/react-google-maps";
import { SetStateAction, useEffect, useState } from "react";
import { BoundChangeListener } from "~/components/map/mapFunction";
import { db } from "~/utils/db.server";
import { useSearchParams, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { Event } from "@prisma/client";
import { EventsDataPatcher } from "~/hook/useEvents";

export const meta: MetaFunction = () => {
  return [
    { title: "Social Butter" },
    { name: "description", content: "Have fun together" },
  ];
};

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<Event[]> {
  const url = new URL(request.url);
  const params = url.searchParams;

  const maxLat = parseInt(params?.get("ne_lat") ?? "");
  const maxLng = parseInt(params?.get("ne_lng") ?? "");
  const minLat = parseInt(params?.get("sw_lat") ?? "");
  const minLng = parseInt(params?.get("sw_lng") ?? "");

  console.log(params);

  if (!maxLat || !maxLng || !minLat || !minLng) {
    console.log("unable to parse map boundary");
    return [];
  }

  //fetch events from DB
  const events = await db.event.findMany({
    take: 100,
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
  console.log("result: " + events);
  return events;
}

async function PlaceEvents({ events, map }: { events: Event[]; map: any }) {
  console.log(events);

  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  console.log("placing markers");
  events.map((event) => {
    const marker = new AdvancedMarkerElement({
      map,
      position: { lat: event.lat, lng: event.lng },
    });
    return marker;
  });
  console.log("finish placing markers");
}

export default function Home() {
  const [userPos, setUserPos] = useState({ lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);
  const apiIsLoaded = useApiIsLoaded();
  const [curLatLngBounds, setCurLatLngBounds] =
    useState<google.maps.LatLngBounds | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { GOOGLE_MAP_MAP_ID } = useRouteLoaderData("root")
  console.log(GOOGLE_MAP_MAP_ID)

  useEffect(() => {
    if (!curLatLngBounds) {
      return;
    }
    const params = new URLSearchParams();
    params.set("ne_lat", curLatLngBounds.getNorthEast().lat().toString());
    params.set("ne_lng", curLatLngBounds.getNorthEast().lng().toString());
    params.set("sw_lat", curLatLngBounds.getSouthWest().lat().toString());
    params.set("sw_lng", curLatLngBounds.getSouthWest().lng().toString());
    setSearchParams(params);
  }, [curLatLngBounds]);

  const rawEvents = useLoaderData<typeof loader>();
  const events = EventsDataPatcher(rawEvents);
  //const map = useMap("main");

  if (!apiIsLoaded) return <>Map is Loading</>;
  //PlaceEvents({ events, map });

  return (
    <div className="flex-1 absolute h-[calc(100vh-8rem)] w-screen touch-pan-x touch-pan-y">
      <Map
        id={"main"}
        center={userPos}
        zoom={3}
        minZoom={3}
        disableDefaultUI={true}
        mapId={GOOGLE_MAP_MAP_ID}
      >
        {events &&
          events.map((event: Event) => {
            return <AdvancedMarker key={event.id} position={{ lng: event.lng, lat: event.lat }} />
          })}
        <BoundChangeListener
          onBoundChange={(
            curLatLngBounds: SetStateAction<google.maps.LatLngBounds | null>
          ) => setCurLatLngBounds(curLatLngBounds)}
        ></BoundChangeListener>
      </Map>
    </div>
  );
}
