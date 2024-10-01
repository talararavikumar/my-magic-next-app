import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json({ name: 'Ravikumar' }, { status: 200 });
};