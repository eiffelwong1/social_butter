import { Menu, Tab, Dialog } from "@headlessui/react";
import { Form, Link } from "@remix-run/react";
import { useCurrentUser } from "~/hook/useCurrentUser";
import { HTMLAttributes, ReactNode, useState } from "react";
import { PlacesAutocomplete } from "~/components/map/places";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

export default function TopNavBar() {
  const userSession = useCurrentUser();
  const apiIsLoaded = useApiIsLoaded();

  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const actStartTime = useState(Date);
  const actEndTime = useState(Date);
  const actMode = useState("InPerson");

  return (
    <nav className="z-30 w-full bg-main-yellow grid justify-stretch grid-flow-row px-12 py-4 h-32 sm:grid-flow-col">
      <div>
        <Link to="/">
          <img
            className="h-24 w-auto lg:block justify-start"
            src="/Dalle_logo.png"
            alt="social butter main logo"
          />
        </Link>
      </div>
      <div
        className="justify-center py-4 grid grid-flow-col bg-yellow-100"
        onClick={() => setSearchPanelOpen(true)}
      >
        <div className="ml-4 text-2xl py-5 hover:py-4">
          {searchLocation?.split(",", 1)[0] || "AnyWhere"}
        </div>
        <div className="ml-4 text-2xl py-5 hover:py-4">Any Time</div>
        <div className="ml-4 text-2xl py-5 hover:py-4">Any Formate</div>
        <div>
          <SearchPanel
            searchPanelOpen={searchPanelOpen}
            setSearchPanelOpen={setSearchPanelOpen}
          >
            <div>
              <h3>location:</h3>
              <PlacesAutocomplete
                searchLocation={searchLocation}
                setSearchLocation={setSearchLocation}
                onComplete={() => setSearchPanelOpen(false)}
              ></PlacesAutocomplete>
            </div>
            <div>
              <></>
            </div>
          </SearchPanel>
        </div>
      </div>

      <div className="flex justify-end">
        <Menu>
          {userSession?.currentUser
            ? LoggedInMenuItems()
            : NotLoggedInMenuItems()}
          <Menu.Button>
            <MenuIcon />
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

type SearchPanelProps = {
  children: ReactNode;
  searchPanelOpen: boolean;
  setSearchPanelOpen: any;
};

function SearchPanel({
  children,
  searchPanelOpen,
  setSearchPanelOpen,
}: SearchPanelProps) {
  return (
    <Dialog
      className="relative z-10 h-screen items-center justify-center text-center backdrop-blur-lg"
      open={searchPanelOpen}
      onClose={() => setSearchPanelOpen(false)}
    >
      <Dialog.Panel className="p-4">{children}</Dialog.Panel>
    </Dialog>
  );
}

function MenuIcon() {
  return (
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
  );
}
