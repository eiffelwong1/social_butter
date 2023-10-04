import type { LinksFunction } from "@remix-run/node";
import stylesheet from "./styles/tailwind.css";
import { Scripts } from "@remix-run/react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { LiveReload, Outlet, Links, Meta } from "@remix-run/react";
import TopNavBar from "~/components/layout/top-nav-bar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Social Butter</title>
        <Links />
      </head>
      <body>
        <Scripts />
        <TopNavBar />
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let error_message = ""
  if(isRouteErrorResponse(error)){
    if(error.status == 404){
      error_message = "the page you are looking for does not exist"
    }else{
      error_message = `${error.status} ${error.statusText}`
    }
    
  }else if(error instanceof Error){
    error_message = error.message
  }else{
    error_message = "Oops, an unknown error have occured"
  }
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <TopNavBar />
        <h1>
          {error_message}
        </h1>
      </body>
    </html>
  );
}
