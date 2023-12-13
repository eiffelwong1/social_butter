import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "react-router";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  useApiIsLoaded,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { SetStateAction, useEffect, useState } from "react";
import { BoundChangeListener } from "~/components/map/mapFunction";
import { db } from "~/utils/db.server";
import {
  useSearchParams,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
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

  const maxLat = parseFloat(params?.get("ne_lat") ?? "");
  const maxLng = parseFloat(params?.get("ne_lng") ?? "");
  const minLat = parseFloat(params?.get("sw_lat") ?? "");
  const minLng = parseFloat(params?.get("sw_lng") ?? "");

  if (!maxLat || !maxLng || !minLat || !minLng) {
    console.log("unable to parse map boundary");
    return [];
  }

  //fetch events from DB
  var results:Event[] = []
  if (maxLng < minLng) {
    // special case when map crosses lng line 0
    results = await db.event.findMany({
      take: 100,
      where: {
        lat: {
          lt: maxLat,
          gt: minLat,
        },
        OR: [
          {
            lng: {
              lt: minLng,
            },
          },
          {
            lng: {
              gt: maxLng,
            },
          },
        ],
      },
    });
  } else {
    //fetch events from DB
    results = await db.event.findMany({
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
  }
  
  console.log("result: " + results);
  return results;
}

export default function Home() {
  const [userPos, setUserPos] = useState({ lat: 0, lng: 0 });
  const [infoOpen, setInfoOpen] = useState(false);
  const apiIsLoaded = useApiIsLoaded();
  const [curLatLngBounds, setCurLatLngBounds] =
    useState<google.maps.LatLngBounds | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { GOOGLE_MAP_MAP_ID } = useRouteLoaderData("root");

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
            return (
              <AdvancedMarkerWithInfo
                key={event.id}
                event={event}
              >
                <div className="text-xl">{event.name}</div>
                {event.detail}
              </AdvancedMarkerWithInfo>
            );
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

function AdvancedMarkerWithInfo({
  event,
  children,
}: {
  event: Event;
  children?: any;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        key={event.id}
        position={{ lng: event.lng, lat: event.lat }}
        onClick={()=>setInfowindowOpen(!infowindowOpen)}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {children}
        </InfoWindow>
      )}
    </>
  );
}
