import { FaHome, FaCompass, FaRobot, FaPlus, FaCog, FaSignOutAlt } from 'react-icons/fa';
import UserAvatar from './session/UserAvatar';

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
            <FaHome className="mr-4" />
            Home
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FaCompass className="mr-4" />
            Explore
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <FaRobot className="mr-4" />
            AI
          </li>
        </ul>
        <hr className="my-4 border-gray-700" />
        <button className="flex items-center p-4 w-full hover:bg-gray-700">
          <FaPlus className="mr-4" />
          Create Playlist
        </button>
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index} className="flex items-center p-4 hover:bg-gray-700">
              {playlist}
            </li>
          ))}
        </ul>
      </nav>
      <hr className="my-4 border-gray-700" />
      <ul>
        <li className="flex items-center p-4 hover:bg-gray-700">
          <FaCog className="mr-4" />
          Settings
        </li>
        <li className="flex items-center p-4 hover:bg-gray-700">
          <FaSignOutAlt className="mr-4" />
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
