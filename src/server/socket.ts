import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('gameStateUpdate', (gameState) => {
    const roomId = gameState.roomId;
    io.to(roomId).emit('gameStateUpdate', gameState);
  });

  socket.on('joinGame', async (gameId, userId) => {
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (game) {
      await prisma.game.update({
        where: { id: gameId },
        data: { players: { connect: { id: userId } } },
      });

      io.emit('playerJoined', { gameId, userId });
    }
  });

  socket.on('startGame', async (gameId) => {
    await prisma.game.update({
      where: { id: gameId },
      data: { status: 'active' },
    });

    const missions = await generateMission(gameId);
    io.emit('gameStarted', { gameId, missions });
  });
});

export { io };
