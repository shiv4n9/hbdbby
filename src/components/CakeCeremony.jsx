import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CakeCeremony = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [showWish, setShowWish] = useState(false);
  const [micPermission, setMicPermission] = useState(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    requestMicrophoneAccess();
    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicPermission(true);
      setupAudioAnalyser(stream);
    } catch (err) {
      setMicPermission(false);
    }
  };

  const setupAudioAnalyser = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    
    analyser.fftSize = 256;
    microphone.connect(analyser);
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    
    detectBlow();
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const checkAudio = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      if (average > 50 && candlesLit.some(lit => lit)) {
        blowOutCandles();
      }
      
      if (candlesLit.some(lit => lit)) {
        animationFrameRef.current = requestAnimationFrame(checkAudio);
      }
    };
    
    checkAudio();
  };

  const blowOutCandles = () => {
    setCandlesLit([false, false, false]);
    setTimeout(() => {
      setShowWish(true);
      triggerMassiveConfetti();
    }, 500);
  };

  const handleCandleClick = (index) => {
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);
    
    if (newCandles.every(lit => !lit)) {
      setTimeout(() => {
        setShowWish(true);
        triggerMassiveConfetti();
      }, 500);
    }
  };

  const handleCandleDoubleClick = (index) => {
    // Blow out all candles on double click
    setCandlesLit([false, false, false]);
    setTimeout(() => {
      setShowWish(true);
      triggerMassiveConfetti();
    }, 500);
  };

  const triggerMassiveConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B2635', '#D4AF37', '#FF69B4']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B2635', '#D4AF37', '#FF69B4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-5xl md:text-6xl text-maroon mb-16 text-center relative z-10"
      >
        Make a Wish! 🕯️
      </motion.h2>
      
      {micPermission === false && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 italic mb-24 text-center"
        >
          Double click the candles to blow them out! 💨
        </motion.p>
      )}
      {micPermission === true && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 italic mb-24 text-center"
        >
          Blow in your microphone / Double click candles! 💨
        </motion.p>
      )}

      {/* Cake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10"
      >
        {/* Cake Layers with Enhanced Styling */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-64 h-16 bg-gradient-to-b from-pink-300 to-maroon rounded-lg shadow-xl relative overflow-hidden cake-layer"
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            {/* Frosting Details */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/30 rounded-b-lg"></div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-72 h-20 bg-gradient-to-b from-pink-200 to-pink-300 rounded-lg shadow-xl relative overflow-hidden cake-layer"
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/30 rounded-b-lg"></div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-80 h-24 bg-gradient-to-b from-pink-300 to-maroon rounded-lg shadow-2xl relative overflow-hidden cake-layer"
          >
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/30 rounded-b-lg"></div>
            {/* Decorative Dots */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gold rounded-full"
                style={{
                  left: `${15 + i * 10}%`,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Candles with Enhanced Effects */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-8">
          {candlesLit.map((lit, index) => (
            <motion.div
              key={index}
              onClick={() => handleCandleClick(index)}
              onDoubleClick={() => handleCandleDoubleClick(index)}
              className="cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {/* Candle */}
                <motion.div
                  animate={lit ? { 
                    rotate: [0, -2, 2, 0],
                    y: [0, -1, 0]
                  } : {
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ 
                    duration: lit ? 0.5 : 0.3,
                    repeat: Infinity 
                  }}
                  className={`w-6 h-16 bg-gradient-to-r from-pink-100 to-pink-200 rounded-t shadow-md transition-all duration-300 ${!lit && 'opacity-60 grayscale'}`}
                >
                  {/* Candle Stripes */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-t"></div>
                  
                  {/* Melted wax drip when lit */}
                  {lit && (
                    <motion.div
                      animate={{
                        height: ['0%', '20%', '0%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-pink-200/60 rounded-b"
                    />
                  )}
                </motion.div>
                
                {/* Flame with Glow */}
                <AnimatePresence>
                  {lit && (
                    <>
                      {/* Glow Effect */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 0.8, 0.6]
                        }}
                        exit={{ 
                          scale: [1, 2, 0],
                          opacity: [0.6, 0.3, 0]
                        }}
                        transition={{
                          scale: { duration: 1, repeat: Infinity },
                          opacity: { duration: 1, repeat: Infinity }
                        }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-400 rounded-full blur-xl"
                      />
                      
                      {/* Flame */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ 
                          scale: [1, 1.5, 0],
                          x: [0, Math.random() * 20 - 10],
                          opacity: [1, 0.5, 0]
                        }}
                        transition={{
                          exit: { duration: 0.4 }
                        }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.15, 1],
                            y: [0, -3, 0]
                          }}
                          transition={{ 
                            duration: 0.4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-4 h-6 bg-gradient-to-t from-yellow-400 via-orange-400 to-red-500 rounded-full relative"
                          style={{ 
                            filter: 'blur(1px)',
                            boxShadow: '0 0 15px rgba(255, 165, 0, 0.8)'
                          }}
                        >
                          {/* Inner Flame */}
                          <div className="absolute inset-0 bg-gradient-to-t from-yellow-200 to-transparent rounded-full scale-75"></div>
                        </motion.div>
                      </motion.div>

                      {/* Sparkles around flame */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          className="absolute text-xs"
                          style={{
                            left: `${50 + (i - 1) * 20}%`,
                            top: '-20px'
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Enhanced Smoke with multiple puffs */}
                <AnimatePresence>
                  {!lit && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`smoke-${i}`}
                          initial={{ opacity: 0, y: 0, scale: 0.3 }}
                          animate={{ 
                            opacity: [0.7, 0.5, 0],
                            y: -60 - i * 10,
                            scale: [0.3, 1, 1.8],
                            x: [0, (i - 1) * 8, (i - 1) * 15]
                          }}
                          transition={{ 
                            duration: 2.5,
                            delay: i * 0.15
                          }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-16 bg-gradient-to-t from-gray-400 via-gray-300 to-transparent rounded-full blur-md"
                        />
                      ))}
                      
                      {/* Blow effect particles */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          initial={{ 
                            opacity: 1,
                            x: 0,
                            y: -10,
                            scale: 1
                          }}
                          animate={{
                            opacity: [1, 0],
                            x: (i - 2) * 15,
                            y: -30,
                            scale: [1, 0]
                          }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.05
                          }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs"
                        >
                          💨
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Wish Overlay with Birthday Wishes Cards */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWish(false)}
            className="fixed inset-0 bg-gradient-to-br from-maroon/95 via-pink-600/95 to-purple-600/95 flex items-center justify-center z-40 backdrop-blur-sm cursor-pointer overflow-y-auto py-8"
          >
            {/* Celebration Particles */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 2, delay: i * 0.03 }}
                className="absolute text-4xl pointer-events-none"
              >
                {['🎉', '✨', '💕', '🎊', '⭐', '🎈'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full mx-4 relative z-10"
            >
              {/* Header */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-8"
              >
                <motion.h3
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-handwriting text-5xl md:text-7xl text-white mb-4"
                >
                  🎉 Yay! 🎉
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-2xl md:text-3xl font-handwriting text-white/90"
                >
                  Make a wish, cutie! 🎂
                </motion.p>
              </motion.div>

              {/* Birthday Wishes Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { emoji: '🎂', message: 'To the girl with the prettiest smile and the kindest heart - Happy Birthday Twin!', color: 'from-pink-100 to-pink-200' },
                  { emoji: '🎉', message: 'You are proof that magic exists. Have the most magical birthday!', color: 'from-purple-100 to-purple-200' },
                  { emoji: '✨', message: 'Tareef karun kya uski, jisne tumhe banaya! Happy Birthday beautiful!', color: 'from-orange-100 to-orange-200' },
                  { emoji: '🌟', message: "You're not just a year older, you're a year more awesome!", color: 'from-blue-100 to-blue-200' },
                  { emoji: '💕', message: 'Happy Birthday to our very own Param Sundari!', color: 'from-pink-100 to-pink-200' },
                  { emoji: '🌸', message: 'Happy Birthday to the human version of sunshine!', color: 'from-purple-100 to-purple-200' },
                  { emoji: '😍', message: "If 'Elegance' had a Wikipedia page, your photo would be the main thumbnail.", color: 'from-pink-100 to-pink-200' },
                  { emoji: '👑', message: 'Cheers to you, the birthday queen!', color: 'from-yellow-100 to-yellow-200' }
                ].map((wish, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
                    className={`bg-gradient-to-br ${wish.color} p-4 rounded-2xl shadow-xl relative`}
                    style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * 2}deg` }}
                  >
                    {/* Balloon on top */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl"
                    >
                      🎈
                    </motion.div>

                    {/* Emoji */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-3 text-center"
                    >
                      {wish.emoji}
                    </motion.div>

                    {/* Message */}
                    <p className="text-gray-700 text-center text-sm font-medium leading-relaxed">
                      {wish.message}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="text-center bg-white/20 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30"
              >
                <motion.h4
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-handwriting text-3xl md:text-4xl text-white mb-3"
                >
                  Have the Most Amazing Birthday! 🎈
                </motion.h4>
                <motion.p
                  className="text-lg text-white/90 font-handwriting mb-4"
                >
                  You deserve all the happiness in the world!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 2 }}
                  className="text-sm text-white/70"
                >
                  Click anywhere to continue
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default CakeCeremony;
