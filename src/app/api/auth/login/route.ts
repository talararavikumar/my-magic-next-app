import { Magic } from '@magic-sdk/admin';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // for managing cookies in app router
import { NextResponse } from 'next/server';

const magic = new Magic(process.env.MAGIC_SECRET_KEY!);

// Helper function to create JWT
const createJwt = (userMetadata: any): string => {
  return jwt.sign(
    {
      email: userMetadata.email,
      issuer: userMetadata.issuer,
    },
    process.env.JWT_SECRET!, // Ensure JWT_SECRET is defined
    { expiresIn: '7d' }
  );
};

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization') || '';
    const didToken = authHeader.split('Bearer ').pop() || '';

    // Validate the DID token with Magic
    const userMetadata = await magic.users.getMetadataByToken(didToken);

    // Create JWT
    const token = createJwt(userMetadata);

    // Set JWT as a cookie
    const cookieHeader = `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`;

    return NextResponse.json({ message: 'Login successful' }, {
      status: 200,
      headers: { 'Set-Cookie': cookieHeader }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
