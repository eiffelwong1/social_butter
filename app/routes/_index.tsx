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

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const [userPos, setUserPos] = useState({ lat: 0, lng: -0 });


  return (
    <div className="flex-1 absolute h-[calc(100vh-8rem)] w-screen touch-pan-x touch-pan-y">
      <MainMap/>
    </div>
  );
}
