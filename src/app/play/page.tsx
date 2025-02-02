import { signOut } from '@/auth';

export default function Play() {
  // const [gameState, setGameState] = useState<GameState | null>(null);
  // const [roomId, setRoomId] = useState('');
  // const [playerName, setPlayerName] = useState('');

  // useEffect(() => {
  //   const socket = io();

  //   socket.on('connect', () => {
  //     console.log('Connected to socket server');
  //   });

  //   socket.on('gameStateUpdate', (newGameState) => {
  //     setGameState(newGameState);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const handleCreateRoom = async () => {
  //   const response = await fetch('/api/game/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       settings: { rounds: 5, mode: 'Guess That Snippet' },
  //     }),
  //   });

  //   const data = await response.json();
  //   setRoomId(data.roomId);
  // };

  // const handleJoinRoom = async () => {
  //   const response = await fetch('/api/game/join', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ roomId, playerName }),
  //   });

  //   const data = await response.json();
  //   setGameState(data.gameRoom);
  // };

  // const handleStartGame = async () => {
  //   await fetch('/api/game/start', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ roomId }),
  //   });
  // };

  // const handleSubmitAnswer = async (answer) => {
  //   await fetch('/api/game/submit-answer', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       roomId,
  //       playerId: session.token.sub,
  //       answer,
  //     }),
  //   });
  // };

  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
        className="w-full"
      >
        <button>LOGOUT</button>
      </form>
      <button>Start Game</button>

      {/* <button>Create Room</button>
      <input
        type="text"
        value={roomId}
        placeholder="Room ID"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />
      <input
        type="text"
        value={playerName}
        placeholder="Player Name"
      />
      <button>Join Room</button>
      <button>Start Game</button>
      <button>Submit Answer</button> */}
    </div>
  );
}
