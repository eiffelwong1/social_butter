import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { deleteUserSession } from '~/utils/session.server';

export async function action({ request }: ActionArgs) {
  return deleteUserSession(request);
}

export async function loader() {
  return redirect('/');
}