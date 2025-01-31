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
});

export { io };
