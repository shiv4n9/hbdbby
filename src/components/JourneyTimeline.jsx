import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import childhoodPhoto from '../assets/childhood.jpeg';
import roomiePhoto from '../assets/roomie.jpeg';
import twinPhoto from '../assets/twin.jpeg';
import fairylightsPhoto from '../assets/fairylights.jpeg';
import shiftingPhoto from '../assets/shifting.jpeg';

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const memories = [
    {
      id: 1,
      caption: "Cutiee ka budayy 🎂",
      image: childhoodPhoto,
      side: 'left',
      year: 'The Beginning',
      rotation: -3
    },
    {
      id: 2,
      caption: "Roomie days 🏠",
      image: roomiePhoto,
      side: 'right',
      year: 'Hostel Life',
      rotation: 2
    },
    {
      id: 3,
      caption: "Happiest Birthday Twin ✨",
      image: twinPhoto,
      side: 'left',
      year: 'Twin Vibes',
      rotation: -2
    },
    {
      id: 4,
      caption: "Best times together 💕",
      image: fairylightsPhoto,
      side: 'right',
      year: 'Memories',
      rotation: 3
    },
    {
      id: 5,
      caption: "Moving on together 📦",
      image: shiftingPhoto,
      side: 'left',
      year: 'Shifting Days',
      rotation: -3
    }
  ];

  const floatingIcons = [
    { emoji: '🍕', x: '10%', delay: 0 },
    { emoji: '☕', x: '85%', delay: 0.5 },
    { emoji: '⭐', x: '20%', delay: 1 },
    { emoji: '💕', x: '75%', delay: 1.5 },
    { emoji: '📚', x: '15%', delay: 2 },
    { emoji: '🎵', x: '80%', delay: 2.5 }
  ];

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-5xl md:text-6xl text-maroon mb-20 text-center relative z-10"
      >
        Our Journey Together 🌟
      </motion.h2>

      {/* Floating Icons with Parallax */}
      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20 pointer-events-none"
          style={{
            left: icon.x,
            y: useTransform(scrollYProgress, [0, 1], [0, -200 * (i % 2 === 0 ? 1 : -1)])
          }}
          initial={{ y: 100, opacity: 0, rotate: 0 }}
          animate={{ 
            y: 0, 
            opacity: 0.2,
            rotate: [0, 360]
          }}
          transition={{ 
            delay: icon.delay, 
            duration: 1,
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* SVG Timeline Path with Gradient */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1">
        <svg className="w-full h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B2635" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B2635" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B2635" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 0 Q 50 250, 0 500 T 0 1000 Q -50 1250, 0 1500 T 0 2000"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10 10"
            initial={{ pathLength: 0 }}
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Memory Cards */}
      <div className="relative max-w-6xl mx-auto space-y-48">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, x: memory.side === 'left' ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex ${memory.side === 'right' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`w-full md:w-1/2 ${memory.side === 'right' ? 'md:pl-20' : 'md:pr-20'}`}>
              {/* Year Badge with Glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block bg-gradient-to-r from-maroon to-pink-600 text-white px-6 py-2 rounded-full font-handwriting text-sm mb-4 shadow-lg relative"
                style={{
                  boxShadow: '0 4px 20px rgba(139, 38, 53, 0.4)'
                }}
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full blur-sm"
                />
                <span className="relative z-10">{memory.year}</span>
              </motion.div>

              {/* Polaroid Card with Enhanced Effects */}
              <motion.div
                whileHover={{ 
                  rotate: 0,
                  scale: 1.1,
                  zIndex: 10,
                  boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
                  y: -10
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white p-4 pb-16 shadow-2xl cursor-pointer polaroid transition-all duration-300"
                style={{ 
                  rotate: memory.rotation,
                  width: '100%',
                  maxWidth: '320px'
                }}
              >
                {/* Scotch Tape - Left Corner */}
                <div className="absolute -top-2 left-8 w-20 h-7 bg-yellow-100/60 rotate-12 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 border-t border-b border-yellow-200/50"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  {/* Jagged edge */}
                  <div className="absolute -left-1 top-0 bottom-0 w-2 bg-yellow-100/60" style={{
                    clipPath: 'polygon(0 0, 100% 10%, 100% 20%, 0 30%, 100% 40%, 100% 50%, 0 60%, 100% 70%, 100% 80%, 0 90%, 100% 100%, 0 100%)'
                  }}></div>
                </div>

                {/* Scotch Tape - Right Corner */}
                <div className="absolute -top-2 right-8 w-20 h-7 bg-yellow-100/60 -rotate-12 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 border-t border-b border-yellow-200/50"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  {/* Jagged edge */}
                  <div className="absolute -right-1 top-0 bottom-0 w-2 bg-yellow-100/60" style={{
                    clipPath: 'polygon(0 0, 100% 10%, 0 20%, 100% 30%, 0 40%, 100% 50%, 0 60%, 100% 70%, 0 80%, 100% 90%, 0 100%, 100% 100%)'
                  }}></div>
                </div>

                {/* Photo Frame with Border Glow */}
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center border-2 border-gray-200 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <img 
                    src={memory.image} 
                    alt={memory.caption}
                    className="w-full h-full object-cover relative z-10"
                  />
                  {/* Corner Decorations */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-maroon/30"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-maroon/30"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-maroon/30"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-maroon/30"></div>
                </div>

                {/* Caption with Handwriting Effect */}
                <p className={`font-handwriting text-xl text-gray-700 text-center mt-4 relative ${
                  memory.side === 'left' ? 'handwritten-caption' : 'handwritten-caption-right'
                }`}>
                  {memory.caption}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gray-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Dots with Pulse */}
      {memories.map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-maroon rounded-full border-4 border-cream shadow-lg z-20"
          style={{ top: `${15 + index * 20}%` }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-maroon rounded-full"
          />
        </motion.div>
      ))}
    </section>
  );
};

export default JourneyTimeline;
