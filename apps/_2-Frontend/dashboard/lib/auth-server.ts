import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, verifySessionToken } from './auth-session';

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
