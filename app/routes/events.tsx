import {
  Link,
  unstable_useViewTransitionState,
  useLoaderData,
} from "@remix-run/react";
import { db } from "~/modules/db.server";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "react-router";
import { NavLink } from "react-router-dom";

export async function loader() {
  const events = await db.event.findMany({ take: 24 });
  return json(events);
}

export default function Events() {
  const events = useLoaderData<typeof loader>();

  console.log("events");
  console.log(events);

  return (
    <div className="grid grid-cols-4 gap-8 p-8">
      {events &&
        events.map((event) => {
          return (
            <div key={event.id} className="border rounded-3xl">
              <NavLink to={`/events/${event.id}`} unstable_viewTransition>
                {({ isTransitioning }) => (
                  <>
                    <img
                      src="/Dalle_logo.png"
                      alt="event"
                      style={
                        isTransitioning
                          ? { viewTransitionName: "hero-image-expand"+event.id }
                          : undefined
                      }
                    />

                    <h1>{event.name}</h1>
                    <p>date: {event.date.toString()}</p>
                  </>
                )}
              </NavLink>
            </div>
          );
        })}
    </div>
  );
}
