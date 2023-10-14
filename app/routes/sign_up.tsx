import { ActionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { createUserSession } from "~/utils/session.server";
import { Input, Button, FormCard } from "~/components/ui/forms";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const email = form.get("email")?.toString() ?? "";
  const password = form.get("password")?.toString() ?? "";
  const displayName = form.get("displayName")?.toString() ?? "";

  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser !== null) {
    updateProfile(auth.currentUser, { displayName: displayName });
  }
  const token = await user.toJSON();

  return createUserSession(token, "/");
}

export default function signUp() {
  return (
    <div className="max-w-2xl mx-auto my-auto flex items-center mt-40">
      <FormCard>
        <Form
          method="post"
          className="flex flex-col items-center space-y-6 py-16"
        >
          <div>
            <label className="block">Name: </label>
            <Input name="displayName" type="text" aria-label="name" />
          </div>
          <div>
            <label className="block">Email: </label>
            <Input name="email" type="email" aria-label="email" />
          </div>
          <div>
            <label className="block">Password: </label>
            <Input name="password" type="password" aria-label="password" />
          </div>
          <div>
            <Button type="submit" className="text-md">
              Sign Up
            </Button>
          </div>
        </Form>
      </FormCard>
    </div>
  );
}
