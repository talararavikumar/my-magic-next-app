import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/firebase';

export async function GET() {
  const user = auth.currentUser;

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const idToken = await user.getIdToken();
  return NextResponse.json({ token: idToken });
}
