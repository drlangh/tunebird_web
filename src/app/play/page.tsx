import { signOut } from '@/auth';
import UserAvatar from '../components/session/UserAvatar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import SpotifyPlayer from '../components/SpotifyPlayer';

export default function Play() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <MainContent />
      </div>
      <SpotifyPlayer />
    </div>
  );
}
