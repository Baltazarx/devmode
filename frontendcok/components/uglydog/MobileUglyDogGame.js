'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../api'
import styles from './MobileUglyDogGame.module.css'

// Mobile-optimized level system - lebih mudah untuk touch interface
const MOBILE_GAME_LEVELS = [
  { level: 1, name: 'Easy', minScore: 0, maxScore: 39, color: '#86FF00', difficulty: 'Beginner', spawnDelay: 2500, autoMissTimer: 2500 },
  { level: 2, name: 'Easy+', minScore: 40, maxScore: 79, color: '#86FF00', difficulty: 'Easy Plus', spawnDelay: 2200, autoMissTimer: 2200 },
  { level: 3, name: 'Medium', minScore: 80, maxScore: 149, color: '#fbbf24', difficulty: 'Medium', spawnDelay: 1800, autoMissTimer: 1800 },
  { level: 4, name: 'Medium+', minScore: 150, maxScore: 249, color: '#fbbf24', difficulty: 'Medium Plus', spawnDelay: 1500, autoMissTimer: 1500 },
  { level: 5, name: 'Hard', minScore: 250, maxScore: 399, color: '#ef4444', difficulty: 'Hard', spawnDelay: 1200, autoMissTimer: 1200 },
  { level: 6, name: 'Hard+', minScore: 400, maxScore: 599, color: '#ef4444', difficulty: 'Very Hard', spawnDelay: 1000, autoMissTimer: 1000 },
  { level: 7, name: 'Expert', minScore: 600, maxScore: 999, color: '#8b5cf6', difficulty: 'Expert', spawnDelay: 900, autoMissTimer: 900 },
  { level: 8, name: 'Ultimate', minScore: 1000, maxScore: Infinity, color: '#8b5cf6', difficulty: 'Ultimate', spawnDelay: 800, autoMissTimer: 800 }
]

// Use same endpoints as desktop
const LEADERBOARD_ENDPOINT = '/api/leaderboard/dev-daily'

export default function MobileUglyDogGame() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  // --- Mobile Game State ---
  const [gameState, setGameState] = useState({
    score: 0,
    misses: 0,
    health: 3,
    gameActive: false,
    highestScore: 0,
    level: 1
  })
  
  const [dogPosition, setDogPosition] = useState({ x: 50, y: 50 })
  const [dogClickable, setDogClickable] = useState(true)
  const [dogTimeoutState, setDogTimeoutState] = useState(false)
  const [levelUpBreak, setLevelUpBreak] = useState(false)
  const [breakCountdown, setBreakCountdown] = useState(0)
  const [previousLevel, setPreviousLevel] = useState(1)
  const [leaderboard, setLeaderboard] = useState([])
  const [showMissAlert, setShowMissAlert] = useState(false)
  
  // Mobile-specific states
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false)
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false)
  const [touchFeedback, setTouchFeedback] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gameStats, setGameStats] = useState({
    totalClicks: 0,
    accuracy: 100,
    gameTime: 0
  })

  // --- Timer Refs ---
  const autoMissTimerRef = useRef(null)
  const levelUpBreakTimerRef = useRef(null)
  const spawnUglyDogRef = useRef(() => {})
  const gameTimerRef = useRef(null)
  const dogActiveRef = useRef(false)

  // --- Level & Difficulty ---
  const getCurrentLevel = useCallback(() => {
    for (let i = MOBILE_GAME_LEVELS.length - 1; i >= 0; i--) {
      if (gameState.score >= MOBILE_GAME_LEVELS[i].minScore) {
        return MOBILE_GAME_LEVELS[i]
      }
    }
    return MOBILE_GAME_LEVELS[0]
  }, [gameState.score])
  
  const currentLevel = getCurrentLevel()

  // --- Mobile-specific functions ---
  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await api.get(LEADERBOARD_ENDPOINT)
      setLeaderboard(Array.isArray(res.data.data) ? res.data.data : [])
    } catch (err) {
      setLeaderboard([])
    }
  }, [])

  const saveScoreToBackend = async (score) => {
    try {
      await api.post('/auth/game/saved', { 
        session_score: score,
        platform: 'mobile',
        device_type: 'mobile'
      })
      fetchLeaderboard()
    } catch (err) {
      console.error('Failed to save mobile score:', err)
    }
  }

  // --- Game Logic ---
  const clearAllTimers = useCallback(() => {
    if (autoMissTimerRef.current) {
      clearTimeout(autoMissTimerRef.current)
      autoMissTimerRef.current = null
    }
    if (levelUpBreakTimerRef.current) {
      clearInterval(levelUpBreakTimerRef.current)
      levelUpBreakTimerRef.current = null
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
      gameTimerRef.current = null
    }
  }, [])

  const stopGame = useCallback(async () => {
    if (gameState.score > 0 && isAuthenticated) {
      saveScoreToBackend(gameState.score)
    }
    
    // Clear game state first
    setGameState(prev => ({
      ...prev,
      gameActive: false,
      score: 0,
      misses: 0,
      health: 3,
      level: 1,
      highestScore: Math.max(prev.score, prev.highestScore)
    }))
    setDogClickable(false)
    setDogTimeoutState(false)
    setLevelUpBreak(false)
    setBreakCountdown(0)
    setGameStats(prev => ({ ...prev, gameTime: 0 }))
    
    // Clear timers
    clearAllTimers()
    
    // Re-enable body scroll
    document.body.classList.remove('mobile-game-active')
    
    // Exit fullscreen when game stops
    await exitFullscreen()
    
    // Small delay to ensure state updates
    setTimeout(() => {
      console.log('Game stopped, state cleaned up')
    }, 100)
  }, [clearAllTimers, isAuthenticated, gameState.score])

  // --- Mobile Dog Spawn (optimized for touch) ---
  const handleAutoMiss = useCallback(() => {
    if (!gameState.gameActive || levelUpBreak || !dogActiveRef.current) return
    clearAllTimers()
    setDogClickable(false)
    setDogTimeoutState(true)
    setShowMissAlert(true)
    setTimeout(() => setShowMissAlert(false), 800) // Longer alert for mobile
    
    setGameState(prev => {
      const newMisses = prev.misses + 1
      let newHealth = prev.health
      let newScore = prev.score
      if (newMisses >= 3) {
        newHealth = prev.health - 1
        newScore = Math.max(0, prev.score - 5) // Less penalty for mobile
        if (newHealth <= 0) {
          // Game over - cleanup everything
          setTimeout(() => {
            document.body.classList.remove('mobile-game-active')
            console.log('Game over cleanup completed')
          }, 100)
          stopGame()
          return { ...prev, misses: 0, health: 0, score: newScore }
        }
        return { ...prev, misses: 0, health: newHealth, score: newScore }
      } else {
        return { ...prev, misses: newMisses }
      }
    })
    
    setTimeout(() => {
      if (gameState.gameActive && !levelUpBreak) {
        spawnUglyDogRef.current()
      }
    }, currentLevel.spawnDelay)
  }, [gameState.gameActive, levelUpBreak, clearAllTimers, stopGame, currentLevel.spawnDelay])

  const spawnUglyDog = useCallback(() => {
    if (!gameState.gameActive || levelUpBreak) return
    
    // Mobile-optimized positioning (avoid edges for easier touch)
    const level = currentLevel.level
    let xRange, yRange, xOffset, yOffset
    if (level <= 2) {
      xRange = 30; yRange = 30; xOffset = 35; yOffset = 35 // More centered for mobile
    } else if (level <= 4) {
      xRange = 40; yRange = 40; xOffset = 30; yOffset = 30
    } else {
      xRange = 50; yRange = 50; xOffset = 25; yOffset = 25
    }
    
    const newX = Math.max(15, Math.min(85, Math.random() * xRange + xOffset))
    const newY = Math.max(15, Math.min(85, Math.random() * yRange + yOffset))
    
    setDogPosition({ x: newX, y: newY })
    setDogClickable(true)
    setDogTimeoutState(false)
    dogActiveRef.current = true
    
    if (autoMissTimerRef.current) clearTimeout(autoMissTimerRef.current)
    autoMissTimerRef.current = setTimeout(() => {
      handleAutoMiss()
    }, currentLevel.autoMissTimer)
  }, [gameState.gameActive, currentLevel, levelUpBreak, handleAutoMiss])

  // Reset game state on component mount
  useEffect(() => {
    // Ensure game is not active on mount
    setGameState(prev => ({
      ...prev,
      gameActive: false,
      score: 0,
      misses: 0,
      health: 3,
      level: 1
    }))
    
    // Cleanup any existing body classes
    document.body.classList.remove('mobile-game-active')
    
    console.log('Mobile game component mounted, state reset')
  }, [])

  // --- Level Up Break ---
  const startLevelUpBreak = useCallback((newLevel) => {
    clearAllTimers()
    setLevelUpBreak(true)
    setBreakCountdown(3) // Shorter break for mobile
    setDogClickable(false)
    let countdownRemaining = 3
    
    levelUpBreakTimerRef.current = setInterval(() => {
      countdownRemaining--
      setBreakCountdown(countdownRemaining)
      if (countdownRemaining <= 0) {
        clearInterval(levelUpBreakTimerRef.current)
        setLevelUpBreak(false)
        setBreakCountdown(0)
        if (gameState.gameActive) {
          spawnUglyDog()
        }
      }
    }, 1000)
  }, [clearAllTimers, spawnUglyDog, gameState.gameActive])

  // --- Mobile Touch Handlers ---
  const handleUglyDogClick = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    if (!gameState.gameActive || !dogClickable || levelUpBreak) return
    
    // Mobile touch feedback
    setTouchFeedback(true)
    setTimeout(() => setTouchFeedback(false), 200)
    
    clearAllTimers()
    setDogClickable(false)
    setDogTimeoutState(true)
    dogActiveRef.current = false
    
    const newScore = gameState.score + 1
    setGameState(prev => ({ ...prev, score: newScore }))
    setGameStats(prev => ({ ...prev, totalClicks: prev.totalClicks + 1 }))
    
    // Level up check
    const newLevelForScore = MOBILE_GAME_LEVELS.find(level => 
      newScore >= level.minScore && newScore <= level.maxScore
    ) || MOBILE_GAME_LEVELS[MOBILE_GAME_LEVELS.length - 1]
    
    if (newLevelForScore.level > previousLevel) {
      setPreviousLevel(newLevelForScore.level)
      startLevelUpBreak(newLevelForScore.level)
      return
    }
    
    setTimeout(() => {
      if (gameState.gameActive && !levelUpBreak) {
        spawnUglyDog()
      }
    }, 300) // Slightly longer delay for mobile
  }, [gameState, dogClickable, levelUpBreak, previousLevel, startLevelUpBreak, spawnUglyDog, clearAllTimers])

  const handleMissClick = useCallback(() => {
    if (!gameState.gameActive || levelUpBreak) return
    setShowMissAlert(true)
    setTimeout(() => setShowMissAlert(false), 800)
    
    const newMisses = gameState.misses + 1
    let newHealth = gameState.health
    let newScore = gameState.score
    
    if (newMisses >= 3) {
      newHealth = gameState.health - 1
      newScore = Math.max(0, gameState.score - 5) // Less penalty for mobile
      if (newHealth <= 0) {
        stopGame()
        return
      }
      setGameState(prev => ({ ...prev, misses: 0, health: newHealth, score: newScore }))
    } else {
      setGameState(prev => ({ ...prev, misses: newMisses }))
    }
  }, [gameState, stopGame, levelUpBreak])

  // --- Fullscreen Functions ---
  const enterFullscreen = async () => {
    try {
      const element = document.documentElement
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen()
      }
      
      // Force landscape orientation
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape')
        } catch (err) {
          console.log('Orientation lock not supported:', err)
        }
      }
    } catch (err) {
      console.log('Fullscreen not supported:', err)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen()
      }
      
      // Ensure cleanup after exiting fullscreen
      setTimeout(() => {
        document.body.classList.remove('mobile-game-active')
        console.log('Fullscreen exited, cleanup completed')
      }, 100)
    } catch (err) {
      console.log('Exit fullscreen error:', err)
    }
  }

  // --- Start Game ---
  const startGame = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    // Prevent body scroll
    document.body.classList.add('mobile-game-active')
    
    // Enter fullscreen landscape first
    await enterFullscreen()
    
    clearAllTimers()
    setGameState(prev => ({
      ...prev,
      gameActive: true,
      score: 0,
      misses: 0,
      health: 3,
      level: 1
    }))
    setPreviousLevel(1)
    setDogClickable(true)
    setDogTimeoutState(false)
    setLevelUpBreak(false)
    setBreakCountdown(0)
    setGameStats(prev => ({ ...prev, gameTime: 0, totalClicks: 0 }))
    
    // Start game timer
    gameTimerRef.current = setInterval(() => {
      setGameStats(prev => ({ ...prev, gameTime: prev.gameTime + 1 }))
    }, 1000)
    
    setTimeout(() => {
      spawnUglyDog()
    }, 1500) // Longer delay for mobile
  }

  // --- Effects ---
  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  useEffect(() => {
    return () => {
      clearAllTimers()
      // Cleanup body scroll prevention
      document.body.classList.remove('mobile-game-active')
    }
  }, [clearAllTimers])

  // Additional cleanup on page load
  useEffect(() => {
    const handlePageLoad = () => {
      document.body.classList.remove('mobile-game-active')
      console.log('Page loaded, cleanup completed')
    }
    
    // Run immediately
    handlePageLoad()
    
    // Also run on page visibility change
    document.addEventListener('visibilitychange', handlePageLoad)
    
    return () => {
      document.removeEventListener('visibilitychange', handlePageLoad)
    }
  }, [])

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const handleKeyDown = (e) => {
      // ESC key to exit fullscreen
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen()
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen])

  // --- Mobile-specific handlers ---
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const openLeaderboardModal = () => {
    setShowLeaderboardModal(true)
    setShowMobileMenu(false)
  }

  const openHowToPlayModal = () => {
    setShowHowToPlayModal(true)
    setShowMobileMenu(false)
  }

  const closeModals = () => {
    setShowLeaderboardModal(false)
    setShowHowToPlayModal(false)
  }

  // --- Render ---
  if (loading) {
    return (
      <div className={styles['mobile-loading']}>
        <div className={styles['loading-spinner']}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['spinning']}>
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
        </div>
        <div className={styles['loading-text']}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={`${styles['mobile-game-container']} ${gameState.gameActive ? styles['game-active'] : ''}`}>
      {/* Simple Mobile Header */}
      <div className={styles['mobile-header']}>
        <div className={styles['mobile-title']}>UglyDog Game</div>
        <div className={styles['mobile-scores']}>
          <span className={styles['current-score']}>{gameState.score}</span>
          <span className={styles['best-score']}>Best: {gameState.highestScore}</span>
        </div>
      </div>

      {/* Landscape Only Message */}
      {!gameState.gameActive && (
        <div className={styles['landscape-message']}>
          <div className={styles['landscape-icon']}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div className={styles['landscape-text']}>Rotate to Landscape</div>
          <div className={styles['landscape-subtitle']}>Game requires landscape mode</div>
        </div>
      )}

      {/* Mobile Game Canvas */}
      <div className={styles['mobile-game-canvas']} onClick={handleMissClick}>
        {gameState.gameActive && (
          <>
            {/* UglyDog */}
            <div
              className={`${styles['mobile-uglydog']} ${!dogClickable ? styles['not-clickable'] : ''} ${dogTimeoutState ? styles['timeout-fade'] : ''} ${touchFeedback ? styles['touch-feedback'] : ''}`}
              style={{
                left: `${dogPosition.x}%`,
                top: `${dogPosition.y}%`,
              }}
              onClick={handleUglyDogClick}
            >
              <img 
                src="/assets/images/uglydog-original.png" 
                alt="UglyDog" 
                className={styles['uglydog-image']}
              />
            </div>

            {/* Miss Alert */}
            {showMissAlert && (
              <div className={styles['mobile-miss-alert']}>
                MISS!
              </div>
            )}

            {/* Level Up Break Overlay */}
            {levelUpBreak && (
              <div className={styles['mobile-levelup-overlay']}>
                <div className={styles['mobile-levelup-content']}>
                  <div className={styles['levelup-text']}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                  <div className={styles['levelup-title']}>LEVEL UP!</div>
                  <div className={styles['levelup-level']}>
                    Level {currentLevel.level} - {currentLevel.difficulty}
                  </div>
                  <div className={styles['levelup-countdown']}>
                    {breakCountdown}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Game Over State */}
        {!gameState.gameActive && (
          <div className={styles['mobile-game-over']}>
            <div className={styles['game-over-icon']}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8"/>
              </svg>
            </div>
            <div className={styles['game-over-text']}>
              {gameState.highestScore > 0 ? `Best: ${gameState.highestScore}` : 'Ready to Play?'}
            </div>
            <button 
              className={styles['mobile-start-btn']}
              onClick={startGame}
            >
              {gameState.highestScore > 0 ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        )}
      </div>

      {/* Simple Mobile Controls */}
      {!gameState.gameActive && (
        <div className={styles['mobile-controls']}>
          <button 
            className={styles['mobile-start-btn']}
            onClick={startGame}
          >
            Start Game
          </button>
          <button 
            className={styles['mobile-leaderboard-btn']}
            onClick={openLeaderboardModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
              <path d="M12 2l0 20"/>
            </svg>
            Leaderboard
          </button>
        </div>
      )}


      {/* Mobile Modals */}
      {showLeaderboardModal && (
        <div className={styles['mobile-modal-overlay']} onClick={closeModals}>
          <div className={styles['mobile-modal']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['modal-header']}>
              <h3>Mobile Leaderboard</h3>
              <button className={styles['modal-close']} onClick={closeModals}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className={styles['modal-content']}>
              {leaderboard.length > 0 ? (
                <div className={styles['mobile-leaderboard-list']}>
                  {leaderboard.slice(0, 10).map((player, index) => (
                    <div key={index} className={styles['mobile-leaderboard-item']}>
                      <span className={styles['rank']}>#{index + 1}</span>
                      <span className={styles['player-name']}>{player.name}</span>
                      <span className={styles['player-score']}>{player.session_score}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles['no-leaderboard']}>
                  <div className={styles['no-leaderboard-icon']}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"/>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                    </svg>
                  </div>
                  <div className={styles['no-leaderboard-text']}>No scores yet!</div>
                  <div className={styles['no-leaderboard-subtitle']}>Be the first to play!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showHowToPlayModal && (
        <div className={styles['mobile-modal-overlay']} onClick={closeModals}>
          <div className={styles['mobile-modal']} onClick={(e) => e.stopPropagation()}>
            <div className={styles['modal-header']}>
              <h3>❓ How to Play</h3>
              <button className={styles['modal-close']} onClick={closeModals}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className={styles['modal-content']}>
              <div className={styles['how-to-play-content']}>
                <div className={styles['instruction-item']}>
                  <div className={styles['instruction-icon']}>👆</div>
                  <div className={styles['instruction-text']}>
                    <strong>Tap the UglyDog</strong><br/>
                    Touch the dog emoji to score points
                  </div>
                </div>
                <div className={styles['instruction-item']}>
                  <div className={styles['instruction-icon']}>❤️</div>
                  <div className={styles['instruction-text']}>
                    <strong>Don't Miss</strong><br/>
                    Miss 3 times and lose 1 health
                  </div>
                </div>
                <div className={styles['instruction-item']}>
                  <div className={styles['instruction-icon']}>📈</div>
                  <div className={styles['instruction-text']}>
                    <strong>Level Up</strong><br/>
                    Higher levels = faster spawns
                  </div>
                </div>
                <div className={styles['instruction-item']}>
                  <div className={styles['instruction-icon']}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className={styles['instruction-text']}>
                    <strong>Compete</strong><br/>
                    Beat the leaderboard!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
