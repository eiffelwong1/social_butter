import { Menu } from "@headlessui/react";
import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCurrentUser } from "~/hook/useCurrentUser";
import { getUserSession } from "~/utils/session.server"


export default function TopNavBar() {
  const userSession = useCurrentUser()
  console.log(userSession)

  return (
    <nav className="w-full bg-main-yellow grid justify-stretch grid-flow-row px-12 py-4 sm:grid-flow-col">
      <div>
        <img
          className="h-32 w-auto lg:block justify-start"
          src="/Dalle_logo.png"
          alt="social butter main logo"
        />
      </div>
      <div className="flex justify-center py-4">
        <ul className="flex">
          <li className="ml-4 text-2xl py-5 hover:py-4">AnyWhere</li>
          <li className="ml-4 text-2xl py-5 hover:py-4">Any Time</li>
          <li className="ml-4 text-2xl py-5 hover:py-4">In Person</li>
        </ul>
      </div>
      <div className="flex justify-end overflow-visible">
        <Menu>
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
          <p>{userSession?.currentUser ? `Hi ${userSession?.currentUser?.displayName ?? "User"}`:""}</p>
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
