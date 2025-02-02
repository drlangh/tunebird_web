import GameSetupForm from '@/app/components/GameSetupForm';

export default function CreateGamePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg">
      <h1 className="text-4xl font-bold mb-8">Create a New Game</h1>
      <GameSetupForm />
    </div>
  );
}
