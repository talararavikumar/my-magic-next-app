import { NextResponse } from 'next/server';
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const actionCodeSettings = {
    url: 'http://localhost:3000/auth/verify',  // Change URL for production
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    return NextResponse.json({ message: 'Email link sent' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
