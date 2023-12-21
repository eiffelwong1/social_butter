import { redirect } from "react-router";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserSession } from "~/modules/session.server";

export async function loader({ request }: LoaderArgs): Promise<any> {
  const userSession = await getUserSession(request);

  return { userSession: userSession };
}

export default function AccountSettings() {
  const data = useLoaderData<typeof loader>();
  if (
    data.userSession?.currentUser === null ||
    data.userSession?.currentUser === undefined
  ) {
    throw Error(
      "unable to fetch account details, please make sure you are logged in and retry in a moment"
    );
  }
  const user = data.userSession?.currentUser;
  console.log(user);
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    return (
      <div>
        <h1>Account Info</h1>
        <div>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="user profile"></img>
          ) : (
            <p> No Profile Photo</p>
          )}
          <p>Hi {user?.displayName ? user.displayName : "User"}</p>
          <hr></hr>
          <Field title="Email" value={user.email}></Field>
          <Field
            title="Is Email Verified?"
            value={user?.emailVerified ? "true" : "false" ?? "null"}
          ></Field>
          <Field
            title="Phone"
            value={user.phoneNumber ?? "not provided"}
          ></Field>
          <Field
            title="Joined Since"
            value={user?.metadata?.creationTime ?? "unknown"}
          ></Field>

          <h2>Geeky Info</h2>
          <Field title="user id" value={user.uid}></Field>
          <Field title="provider id" value={user.providerId ?? "null"}></Field>
        </div>
      </div>
    );
  } else {
    return redirect("/login");
  }
}

export type Field = {
  title: string;
  value: string | null | undefined;
};
function Field({ title, value }: Field) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
