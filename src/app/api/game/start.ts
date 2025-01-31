import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { io } from '@/server/socket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { roomId } = req.body;

    try {
      const gameRoom = await prisma.gameRoom.update({
        where: { id: roomId },
        data: {
          state: 'STARTED',
          startedAt: new Date(),
        },
        include: {
          players: true,
        },
      });

      io.to(roomId).emit('gameStarted', { gameRoom });

      res.status(200).json({ gameRoom });
    } catch (error) {
      res.status(500).json({ error: 'Failed to start game' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
