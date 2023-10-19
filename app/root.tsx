import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import stylesheet from "./styles/tailwind.css";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { LiveReload, Outlet, Links, Meta, Scripts  } from "@remix-run/react";
import TopNavBar from "~/components/layout/top-nav-bar";
import Footer from "~/components/layout/footer";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getUserSession } from "./utils/session.server";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({request}:LoaderArgs){
  const userSession = await getUserSession(request);

  return {userSession: userSession}
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Social Butter</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <TopNavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        <Scripts />
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
    <html lang="en">
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
