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
          state: 'ENDED',
          endedAt: new Date(),
        },
        include: {
          players: true,
        },
      });

      const finalScores = gameRoom.players.map(player => ({
        playerId: player.id,
        score: player.score,
      }));

      const winner = finalScores.reduce((prev, current) => (prev.score > current.score) ? prev : current);

      io.to(roomId).emit('gameEnded', { finalScores, winner });

      res.status(200).json({ finalScores, winner });
    } catch (error) {
      res.status(500).json({ error: 'Failed to end game' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
