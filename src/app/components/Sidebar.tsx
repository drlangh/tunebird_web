import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import {
  LuCompass,
  LuHouse,
  LuLogOut,
  LuSparkles,
} from 'react-icons/lu';
import UserAvatar from './session/UserAvatar';
import { signOut } from '@/auth';

const Sidebar = () => {
  const playlists = ['Playlist 1', 'Playlist 2', 'Playlist 3'];

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="flex items-center p-4">
        <UserAvatar />
        <span className="ml-4">User Name</span>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <LuHouse className="mr-4" />
            Home
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <LuCompass className="mr-4" />
            Explore
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <LuSparkles className="mr-4" />
            AI
          </li>
        </ul>
        <hr className="my-4 border-gray-700" />
        <button className="flex items-center p-4 w-full hover:bg-gray-700">
          Create Playlist
        </button>
        <ul>
          {playlists.map((playlist, index) => (
            <li
              key={index}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              {playlist}
            </li>
          ))}
        </ul>
      </nav>
      <hr className="my-4 border-gray-700" />
      <ul>
        <li className="flex items-center p-4 hover:bg-gray-700">
          <HiOutlineCog8Tooth className="mr-4" />
          Settings
        </li>
        <li>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="except w-full flex items-center p-4 hover:bg-gray-700">
              <LuLogOut className="mr-4" />
              Log Out
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
