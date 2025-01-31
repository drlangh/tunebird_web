import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';

import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  //   try {
  //     const { settings } = await request.json();
  //     const gameRoom = await prisma.game.create({
  //       data: {
  //         // settings,
  //       },
  //     });
  //     return Response.json({
  //       gameRoomId: gameRoom.id,
  //       gameRoom,
  //     });
  //   } catch (error) {
  //     return Response.json(
  //       { error: 'Failed to create game room' },
  //       { status: 500 }
  //     );
  //   }
}
