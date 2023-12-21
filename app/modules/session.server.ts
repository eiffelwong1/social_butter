import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '~/modules/firebase.server'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'Cookie',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
})

export async function createUserSession (userSession: JSON, redirectTo: string) {
  const session = await storage.getSession()
  session.set('CurrentUserSession', userSession)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

export type UserSession = {
  currentUser: User
}

export async function getUserSession (
  request: Request
): Promise<UserSession | null> {
  const cookie = await storage.getSession(request.headers.get('Cookie'))
  if (cookie && cookie.get('CurrentUserSession')) {
    return { currentUser: cookie.get('CurrentUserSession') }
  }
  return null
}

export async function deleteUserSession (request: Request) {
  const cookie = await storage.getSession(request.headers.get('Cookie'))
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(cookie)
    }
  })
}
