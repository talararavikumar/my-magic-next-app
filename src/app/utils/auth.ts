import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // Access cookies in server components

export const verifyToken = (): any | null => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    return null;
  }
};
