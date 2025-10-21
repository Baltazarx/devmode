'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './UglyDogGameLayout.module.css';
import api from '@/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import NativeUglyDogGame from './NativeUglyDogGame';
import MobileUglyDogGame from './MobileUglyDogGame';

// Level system based on score - SIMPLE & COMPETITIVE!
const GAME_LEVELS = [
  { level: 1, name: 'Easy', minScore: 0, maxScore: 49, color: '#86FF00', difficulty: 'Beginner' },
  { level: 2, name: 'Easy', minScore: 50, maxScore: 99, color: '#86FF00', difficulty: 'Easy' },
  { level: 3, name: 'Easy+', minScore: 100, maxScore: 149, color: '#86FF00', difficulty: 'Easy Plus' },
  { level: 4, name: 'Medium', minScore: 150, maxScore: 199, color: '#fbbf24', difficulty: 'Medium' },
  { level: 5, name: 'Medium', minScore: 200, maxScore: 299, color: '#fbbf24', difficulty: 'Medium+' },
  { level: 6, name: 'Medium+', minScore: 300, maxScore: 399, color: '#fbbf24', difficulty: 'Challenging' },
  { level: 7, name: 'Hard', minScore: 400, maxScore: 599, color: '#ef4444', difficulty: 'Hard' },
  { level: 8, name: 'Hard+', minScore: 600, maxScore: 799, color: '#ef4444', difficulty: 'Very Hard' },
  { level: 9, name: 'Expert', minScore: 800, maxScore: 999, color: '#ef4444', difficulty: 'Expert' },
  { level: 10, name: 'Ultimate', minScore: 1000, maxScore: Infinity, color: '#8b5cf6', difficulty: 'Ultimate' }
];

// Ganti endpoint leaderboard di sini (dev/prod)
const LEADERBOARD_ENDPOINT = '/api/leaderboard/dev-daily'; // ganti ke '/api/leaderboard/daily' untuk production

export default function UglyDogGameLayout() {
  // Auth context
  const { loading } = useAuth();
  
  // --- Mobile Detection ---
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Render ---
  if (loading) {
    return <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>;
  }

  // Render mobile version for mobile devices
  if (isMobile) {
    return <MobileUglyDogGame />;
  }

  // Render desktop version for desktop devices
  return (
    <div className={styles['uglydog-layout-root']}>
      {/* Header */}
      <header className={styles['header']}>
        <h1>UglyDog Clicker</h1>
        <span className={styles['tagline']}>
          Fast. Fun. Competitive. Can you beat the leaderboard?
        </span>
      </header>
      <main className={styles['main-grid']}>
        <NativeUglyDogGame />
      </main>
    </div>
  );
}
