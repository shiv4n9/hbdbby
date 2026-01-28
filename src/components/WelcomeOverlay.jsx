import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-maroon/90 to-pink-900/90 backdrop-blur-sm"
        >
          {/* Envelope */}
          <motion.div
            initial={{ scale: 0.8, rotateX: 20 }}
            animate={{ scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            {/* Envelope Body */}
            <div className="relative w-80 h-56 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl transform-gpu"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(10deg) rotateY(-5deg)'
              }}
            >
              {/* Envelope Flap */}
              <motion.div
                animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-amber-100 to-amber-200 origin-top"
                style={{
                  clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Wax Seal */}
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  if (Math.abs(info.offset.y) > 50 || Math.abs(info.offset.x) > 50) {
                    handleOpen();
                  }
                  setIsDragging(false);
                }}
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                onClick={handleOpen}
                className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-maroon to-red-900 rounded-full shadow-xl flex items-center justify-center z-10"
                style={{
                  boxShadow: '0 10px 30px rgba(139, 38, 53, 0.5)'
                }}
              >
                <div className="text-center">
                  <p className="text-white font-handwriting text-xs leading-tight">
                    For My<br/>Twin
                  </p>
                  <p className="text-white/70 text-2xl mt-1">💕</p>
                </div>
              </motion.div>

              {/* Decorative Lines */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 pt-24">
                <div className="w-full h-px bg-amber-300/50"></div>
                <div className="w-3/4 h-px bg-amber-300/50"></div>
                <div className="w-full h-px bg-amber-300/50"></div>
              </div>
            </div>

            {/* Instruction Text */}
            <motion.p
              animate={{ opacity: isDragging ? 0 : 1 }}
              className="text-center mt-8 text-white font-handwriting text-xl"
            >
              Click or drag the seal to open 💌
            </motion.p>
          </motion.div>

          {/* Floating Sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
