import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Server } from 'socket.io';
import { generateMission } from '@/lib/ai-service';

let io: Server | null = null;

export async function POST(req: Request) {
  try {
    const { hostId, mode, rounds, numberOfPlayers, theme } = await req.json();

    if (!hostId || !mode || !rounds || !numberOfPlayers || !theme) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios' },
        { status: 400 }
      );
    }

    const game = await prisma.game.create({
      data: {
        hostId,
        mode,
        rounds,
        numberOfPlayers,
        theme,
        status: 'waiting',
      },
    });

    if (!io) {
      io = new Server(3001, {
        cors: { origin: '*' },
      });

      io.on('connection', (socket) => {
        socket.on('joinGame', async (gameId, userId) => {
          const game = await prisma.game.findUnique({
            where: { id: gameId },
          });

          if (game) {
            await prisma.game.update({
              where: { id: gameId },
              data: { players: { connect: { id: userId } } },
            });

            io?.emit('playerJoined', { gameId, userId });
          }
        });

        socket.on('startGame', async (gameId) => {
          await prisma.game.update({
            where: { id: gameId },
            data: { status: 'active' },
          });

          const missions = await generateMission(gameId);
          io?.emit('gameStarted', { gameId, missions });
        });
      });
    }

    return NextResponse.json({ gameId: game.id });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al crear la partida: ${error}` },
      { status: 500 }
    );
  }
}
