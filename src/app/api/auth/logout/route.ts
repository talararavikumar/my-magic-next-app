import { NextResponse } from 'next/server';

export async function POST() {
  // Expire the JWT cookie
  const cookieHeader = `token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict`;

  return NextResponse.json({ message: 'Logged out successfully' }, {
    status: 200,
    headers: { 'Set-Cookie': cookieHeader }
  });
}
