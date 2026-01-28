import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const LandingPage = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#8B2635', '#D4AF37', '#FF69B4', '#FFB6C1']
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Floating Confetti Button */}
      <motion.button
        onClick={triggerConfetti}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-maroon to-pink-400 rounded-full text-3xl shadow-2xl z-50 hover:scale-110 active:scale-95 transition-transform"
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 10px 30px rgba(139, 38, 53, 0.4)',
            '0 10px 40px rgba(255, 105, 180, 0.6)',
            '0 10px 30px rgba(139, 38, 53, 0.4)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎉
      </motion.button>

      {/* Hero Content */}
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-4"
          >
            🎂
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-handwriting text-6xl md:text-8xl text-maroon mb-6 drop-shadow-lg"
        >
          Happy Birthday, Twin! 🐼👯‍♀️
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 italic mb-8"
        >
          To my bestest roomie and shifting partner ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border-2 border-maroon/20 shadow-lg"
          >
            <p className="font-handwriting text-lg text-maroon">
              Scroll down for surprises! 🎁
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: Math.random() * 360 + 360,
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {['🎂', '🎉', '🎈', '✨', '💕', '🎁', '🌟', '💝', '🐼'][Math.floor(Math.random() * 9)]}
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-maroon/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default LandingPage;
