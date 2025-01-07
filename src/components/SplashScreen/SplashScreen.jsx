import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Transition to main page after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts to prevent memory leaks
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <h1 className="splash-title">Welcome to Shape Viewer</h1>
      <p className="splash-subtitle">Loading your experience...</p>
    </div>
  );
};

export default SplashScreen;
