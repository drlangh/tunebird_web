import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { hostId, numberOfPlayers, numberOfRounds, gameMode, theme } = req.body;

    if (!hostId || !numberOfPlayers || !numberOfRounds || !gameMode || !theme) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newGame = await prisma.game.create({
        data: {
          hostId,
          numberOfPlayers,
          numberOfRounds,
          gameMode,
          theme,
          status: 'waiting',
        },
      });

      return res.status(201).json(newGame);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create game' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
