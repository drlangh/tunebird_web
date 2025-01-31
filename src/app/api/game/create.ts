import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { settings } = req.body;

    try {
      const gameRoom = await prisma.gameRoom.create({
        data: {
          id: uuidv4(),
          settings,
          createdAt: new Date(),
        },
      });

      res.status(200).json({ gameRoomId: gameRoom.id, gameRoom });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game room' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
