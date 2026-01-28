import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const VibeSwitch = ({ isPartyMode, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isPartyMode);
    if (!isPartyMode) {
      // Trigger confetti when switching to party mode
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.3 },
        colors: ['#FF1493', '#00FFFF', '#FFD700', '#FF69B4']
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-8 right-8 z-50"
    >
      <div className="flex flex-col items-center gap-2">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 relative overflow-hidden ${
            isPartyMode
              ? 'bg-gradient-to-br from-purple-600 to-pink-500'
              : 'bg-gradient-to-br from-amber-200 to-amber-400'
          }`}
          style={{
            boxShadow: isPartyMode
              ? '0 0 30px rgba(255, 20, 147, 0.6)'
              : '0 10px 30px rgba(212, 175, 55, 0.4)'
          }}
        >
          {/* Animated Background */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
          
          {/* Icon */}
          <motion.span
            animate={{ rotate: isPartyMode ? [0, 360] : 0 }}
            transition={{ duration: 2, repeat: isPartyMode ? Infinity : 0, ease: "linear" }}
            className="relative z-10"
          >
            {isPartyMode ? '🪩' : '🌙'}
          </motion.span>
        </motion.button>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`text-xs font-handwriting font-bold ${
            isPartyMode ? 'text-pink-400' : 'text-maroon'
          }`}
        >
          {isPartyMode ? 'Party!' : 'Chill'}
        </motion.p>
        
        {/* Mode Indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className={`h-1 rounded-full ${
            isPartyMode ? 'bg-pink-400' : 'bg-maroon'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default VibeSwitch;
