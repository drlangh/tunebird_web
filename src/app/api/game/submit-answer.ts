import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { io } from '@/server/socket';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { roomId, playerId, answer } = req.body;

    try {
      const gameRoom = await prisma.gameRoom.findUnique({
        where: { id: roomId },
        include: { players: true },
      });

      if (!gameRoom) {
        return res.status(404).json({ error: 'Game room not found' });
      }

      const player = gameRoom.players.find((p) => p.id === playerId);

      if (!player) {
        return res.status(404).json({ error: 'Player not found' });
      }

      // Validate the answer and update player scores
      const isCorrect = validateAnswer(
        answer,
        gameRoom.currentQuestion
      );
      const updatedScore = isCorrect
        ? player.score + 1
        : player.score;

      await prisma.player.update({
        where: { id: playerId },
        data: { score: updatedScore },
      });

      // Notify all players about the updated game state
      io.to(roomId).emit('answerSubmitted', {
        playerId,
        updatedScore,
      });

      res.status(200).json({ playerId, updatedScore });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit answer' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function validateAnswer(
  answer: string,
  currentQuestion: any
): boolean {
  // Implement your answer validation logic here
  return answer === currentQuestion.correctAnswer;
}
