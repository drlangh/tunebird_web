import React, { useState } from 'react';

interface MissionPopupProps {
  mission: string;
  onClose: () => void;
}

const MissionPopup: React.FC<MissionPopupProps> = ({ mission, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Secret Mission</h2>
        <p>{mission}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center' as 'center',
  },
};

export default MissionPopup;
