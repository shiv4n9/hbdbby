import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const cursorX = useSpring(0, { stiffness: 150, damping: 15 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Magnetic snap to interactive elements
      const target = e.target;
      const magneticElements = document.querySelectorAll('.polaroid, .cake-layer, button, a');
      
      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // If within 80px of center, snap to it
        if (distance < 80) {
          const pullStrength = 0.3;
          targetX = e.clientX + (centerX - e.clientX) * pullStrength;
          targetY = e.clientY + (centerY - e.clientY) * pullStrength;
          setIsMagnetic(true);
        } else {
          setIsMagnetic(false);
        }
      });

      setMousePosition({ x: targetX, y: targetY });
      cursorX.set(targetX);
      cursorY.set(targetY);

      // Add sparkle trail
      if (Math.random() > 0.7) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY
        };
        setSparkles(prev => [...prev, newSparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 1000);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('polaroid') ||
        target.classList.contains('draggable-item') ||
        target.classList.contains('cake-layer') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor - Sparkle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isMagnetic ? 360 : 0
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20,
            rotate: { duration: 0.6 }
          }}
          className="text-2xl"
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 50 : 30,
            height: isHovering ? 50 : 30,
            borderColor: isHovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(255, 255, 255, 0.5)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="rounded-full border-2"
          style={{ mixBlendMode: 'difference' }}
        />
      </motion.div>

      {/* Sparkle Trail */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 pointer-events-none z-[9997] text-gold text-sm"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            translateX: '-50%',
            translateY: '-50%'
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Fairy Dust Particles */}
      {sparkles.slice(-3).map((sparkle, i) => (
        <motion.div
          key={`dust-${sparkle.id}`}
          initial={{ opacity: 0.6, scale: 0.5, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            x: (Math.random() - 0.5) * 30,
            y: (Math.random() - 0.5) * 30
          }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="fixed top-0 left-0 pointer-events-none z-[9997] w-1 h-1 bg-gold rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
