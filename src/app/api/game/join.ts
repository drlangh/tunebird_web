import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { io } from '@/server/socket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { roomId, playerName } = req.body;

    try {
      const gameRoom = await prisma.gameRoom.update({
        where: { id: roomId },
        data: {
          players: {
            create: {
              name: playerName,
              joinedAt: new Date(),
            },
          },
        },
        include: {
          players: true,
        },
      });

      io.to(roomId).emit('playerJoined', { roomId, playerName });

      res.status(200).json({ gameRoom });
    } catch (error) {
      res.status(500).json({ error: 'Failed to join game room' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
