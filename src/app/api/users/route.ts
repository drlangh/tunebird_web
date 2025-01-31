import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, email, spotifyId } = await req.json();

  const newUser = await prisma.user.create({
    data: { username, email, spotifyId },
  });

  return NextResponse.json(newUser);
}
