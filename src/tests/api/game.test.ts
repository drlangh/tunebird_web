import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/game/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('POST /api/game', () => {
  it('should create a new game and save it in the database', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        hostId: 'test-host-id',
        numberOfPlayers: 4,
        numberOfRounds: 3,
        gameMode: 'classic',
        theme: 'pop',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    const game = await prisma.game.findUnique({
      where: { hostId: 'test-host-id' },
    });
    expect(game).not.toBeNull();
    expect(game?.numberOfPlayers).toBe(4);
    expect(game?.numberOfRounds).toBe(3);
    expect(game?.gameMode).toBe('classic');
    expect(game?.theme).toBe('pop');
  });

  it('should return 400 if required fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        hostId: 'test-host-id',
        numberOfPlayers: 4,
        gameMode: 'classic',
        theme: 'pop',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toEqual(
      JSON.stringify({ error: 'Missing required fields' })
    );
  });
});
