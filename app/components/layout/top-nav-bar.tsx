import { Menu } from "@headlessui/react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useCurrentUser } from "~/hook/useCurrentUser";
import { auth } from "~/utils/firebase.server";
import { onAuthStateChanged } from "firebase/auth";
import { LoaderArgs } from "@remix-run/node";
import React from "react";
import { PlacesAutocomplete } from "~/components/map/places";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

export default function TopNavBar() {
  const userSession = useCurrentUser();
  const apiIsLoaded = useApiIsLoaded();
  

  return (
    <nav className="z-30 w-full bg-main-yellow grid justify-stretch grid-flow-row px-12 py-4 h-32 overflow-visible sm:grid-flow-col">
      <div>
        <img
          className="h-32 w-auto lg:block justify-start"
          src="/Dalle_logo.png"
          alt="social butter main logo"
        />
      </div>
      <div className="flex justify-center py-4">
        <ul className="flex">
          <li className="ml-4 text-2xl py-5 hover:py-4">AnyWhere {apiIsLoaded && <PlacesAutocomplete></PlacesAutocomplete>}</li>
          <li className="ml-4 text-2xl py-5 hover:py-4">Any Time</li>
          <li className="ml-4 text-2xl py-5 hover:py-4">In Person</li>
        </ul>
      </div>
      <div className="flex justify-end overflow-visible">
        <Menu>
          {userSession?.currentUser
            ? LoggedInMenuItems()
            : NotLoggedInMenuItems()}
          <Menu.Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
        </Menu>
      </div>
    </nav>
  );
}

function NotLoggedInMenuItems() {
  return (
    <Menu.Items className="absolute top-24 mt-2 w-56 origin-top-right">
      <Menu.Item>
        {({ active }) => (
          <Link
            className={`${
              active && "bg-blue-500"
            } group flex w-full items-center`}
            to="/sign_up"
          >
            Sign Up
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            className={`${
              active && "bg-blue-500"
            } group flex w-full items-center`}
            to="/login"
          >
            Log In
          </Link>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            className={`${
              active && "bg-blue-500"
            } group flex w-full items-center`}
            to="/login"
          >
            Orginize Activities
          </Link>
        )}
      </Menu.Item>
    </Menu.Items>
  );
}

function LoggedInMenuItems() {
  return (
    <Menu.Items className="absolute top-24 mt-2 w-56 origin-top-right">
      <Menu.Item>
        {({ active }) => (
          <Link
            className={`${
              active && "bg-blue-500"
            } group flex w-full items-center`}
            to="/account-settings"
          >
            Account
          </Link>
        )}
      </Menu.Item>
      <Form method="POST" action="/logout">
        <button>Logout</button>
      </Form>
    </Menu.Items>
  );
}
