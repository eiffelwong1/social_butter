import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { MainMap } from "~/components/map/map";

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

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const [userPos, setUserPos] = useState({ lat: 0, lng: -0 });


  return (
    <div className="flex-1 absolute h-full w-screen touch-pan-x touch-pan-y">
      <MainMap googleMapsAPIKey={data.GOOGLE_MAP_API_KEY ?? ""}/>
    </div>
  );
}
