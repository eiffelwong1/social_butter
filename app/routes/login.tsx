import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useRouteError } from "@remix-run/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  createUserSession,
  getUserSession,
  deleteUserSession,
} from "~/modules/session.server";
import { auth } from "~/modules/firebase.server";
import { Button, Input, FormCard } from "~/components/ui/forms";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent")?.toString() ?? "";

  if (intent === "logout") {
    return deleteUserSession(request);
  }

  const email = form.get("email")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";

  if (email === null) {
    console.warn("Email must be filled in");
    throw new Error("Email must be filled in");
  }

  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (!user) {
    console.warn("Unable to sign in");
    throw new Error("Unable to sign in");
  }

  console.log("complete");
}

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  return { session: session };
}

export default function Login() {
  const data = useLoaderData<typeof loader>();

  if (data?.session?.currentUser) {
    return (
      <div className="flex flex-col items-center space-y-6 pt-16">
        <p>You have logged in already</p>
        <Form method="post">
          <Button type="submit" formAction="/logout">
            Logout ?
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto my-auto flex items-center mt-40">
      <FormCard>
        <Form
          method="post"
          className="flex flex-col items-center space-y-6 mx-auto pt-16 pb-8"
        >
          <div>
            <label className="block">Email: </label>
            <Input name="email" type="email" aria-label="email" />
          </div>
          <div>
            <label className="block">Password: </label>
            <Input name="password" type="password" aria-label="password" />
          </div>
          <div>
            <Button type="submit">login</Button>
          </div>
          <p className="text-sm">
            Don't have a account yet?
            <Link to={"/sign_up"} className="text-base font-semibold">
              Sign Up
            </Link>
          </p>
        </Form>
      </FormCard>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <p>
      Login Failed: An Unexpected Error have occured. Please try again in a
      moment
    </p>
  );
}
