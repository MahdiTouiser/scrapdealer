import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (token) {
    redirect('/dashboard');
  } else {
    redirect('/auth');
  }

  return null;
}
