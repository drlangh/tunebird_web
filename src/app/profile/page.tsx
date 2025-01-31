import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [volume, setVolume] = useState(50);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUser(session.user);
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="user-info">
        <img src={user.image} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Spotify Premium: {user.premium ? 'Yes' : 'No'}</p>
      </div>
      <div className="settings">
        <h2>Settings</h2>
        <div className="setting">
          <label htmlFor="volume">Volume</label>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <div className="setting">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div className="setting">
          <label htmlFor="notifications">Notifications</label>
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
