import type { LoaderFunction } from "@remix-run/node";
import { useParams, useLoaderData, Link } from "@remix-run/react";
import { db } from "~/modules/db.server";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const event = await db.event.findFirstOrThrow({
    where: { id: params.eventId },
  });
  return json({ event });
};

export default function EventRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Link to="/events" unstable_viewTransition>Back to events</Link>
      <img
        src="/Dalle_logo.png"
        alt="event"
        style={{viewTransitionName: "hero-image-expand"+data.event.id}}
        className="h-40"
      />
      <h1>{data.event.name}</h1>

      <p>start date: {data.event.date}</p>

      <p>{data.event.detail}</p>
    </>
  );
}


export function ErrorBoundary() {
  const { eventId } = useParams();
  return (
    <div className="error-container">
      There was an error loading event by the id {eventId}.
    </div>
  );
}
