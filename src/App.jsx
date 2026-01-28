import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WelcomeOverlay from './components/WelcomeOverlay';
import CustomCursor from './components/CustomCursor';
import VibeSwitch from './components/VibeSwitch';
import ScrollProgress from './components/ScrollProgress';
import LandingPage from './components/LandingPage';
import CakeCeremony from './components/CakeCeremony';
import JourneyTimeline from './components/JourneyTimeline';
import ShiftingChaos from './components/ShiftingChaos';
import TwinQuiz from './components/TwinQuiz';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Force scroll to top on page load/reload - prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleWelcomeOpen = () => {
    setShowWelcome(false);
    // Start music when envelope opens
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/birthday-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      {!showWelcome && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 left-8 z-50 bg-maroon text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer"
          style={{ cursor: 'pointer' }}
          title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isMusicPlaying ? '🔊' : '🔇'}
        </button>
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      {!showWelcome && <ScrollProgress />}

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay onOpen={handleWelcomeOpen} />}

      {/* Main Content */}
      <div 
        className={`min-h-screen overflow-x-hidden transition-all duration-1000 relative ${
          isPartyMode 
            ? 'bg-gradient-to-br from-purple-900 via-violet-800 to-pink-900' 
            : 'bg-cream'
        }`}
        style={{
          cursor: 'none'
        }}
      >
        {/* Celebratory Background Elements */}
        {!showWelcome && (
          <>
            {/* Floating Balloons */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`balloon-${i}`}
                className="fixed pointer-events-none text-6xl z-0"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100
                }}
                animate={{
                  y: -200,
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth
                  ],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              >
                {['🎈', '🎉', '🎊', '🎁', '🐼'][i % 5]}
              </motion.div>
            ))}

            {/* Floating Sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="fixed pointer-events-none text-2xl z-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Floating Hearts */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="fixed pointer-events-none text-4xl z-0 opacity-30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50
                }}
                animate={{
                  y: -100,
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth + (Math.random() - 0.5) * 100
                  ],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "linear"
                }}
              >
                💕
              </motion.div>
            ))}

            {/* Confetti Pieces */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="fixed pointer-events-none w-3 h-3 z-0"
                style={{
                  background: ['#8B2635', '#D4AF37', '#FF69B4', '#FFD700', '#FF1493'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: '-20px'
                }}
                animate={{
                  y: window.innerHeight + 50,
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 360, 720],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            ))}

            {/* Twinkling Stars */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="fixed pointer-events-none text-3xl z-0"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                ⭐
              </motion.div>
            ))}

            {/* Floating Gift Boxes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`gift-${i}`}
                className="fixed pointer-events-none text-5xl z-0 opacity-40"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100
                }}
                animate={{
                  y: -150,
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 3,
                  ease: "easeInOut"
                }}
              >
                {i % 2 === 0 ? '🎁' : '🐼'}
              </motion.div>
            ))}

            {/* Cute Pandas waving from corners */}
            <motion.div
              className="fixed bottom-8 right-8 text-7xl z-0 pointer-events-none"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🐼
            </motion.div>
          </>
        )}

        {/* Spotlight Effect in Party Mode */}
        {isPartyMode && (
          <div
            className="fixed pointer-events-none z-40 transition-all duration-200"
            style={{
              width: '400px',
              height: '400px',
              left: mousePosition.x - 200,
              top: mousePosition.y - 200,
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
        )}

        {/* Vibe Switch */}
        <VibeSwitch isPartyMode={isPartyMode} onToggle={setIsPartyMode} />

        {/* Content Sections */}
        <div className={isPartyMode ? 'text-white' : ''}>
          <LandingPage />
          <CakeCeremony />
          <JourneyTimeline />
          <ShiftingChaos />
          <TwinQuiz />
          
          <footer className={`text-center py-12 font-handwriting text-2xl ${
            isPartyMode ? 'text-pink-300' : 'text-maroon'
          }`}>
            <p>Tere varga koi konya, my ladli twin! 👯‍♀️</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
