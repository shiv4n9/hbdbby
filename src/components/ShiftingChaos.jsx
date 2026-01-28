import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPopSound, playSuccessSound, hapticFeedback } from '../utils/sounds';
import shiftingPhoto from '../assets/shifting.jpeg';

const ShiftingChaos = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // Increased time for harder game
  const [items, setItems] = useState([
    // Items to pack (6 essential items)
    { id: 1, emoji: '👕', x: 50, y: 50, packed: false, shouldPack: true, name: 'Shirt' },
    { id: 2, emoji: '👖', x: 150, y: 100, packed: false, shouldPack: true, name: 'Jeans' },
    { id: 3, emoji: '📚', x: 250, y: 80, packed: false, shouldPack: true, name: 'Books' },
    { id: 4, emoji: '🎒', x: 100, y: 200, packed: false, shouldPack: true, name: 'Backpack' },
    { id: 5, emoji: '👗', x: 300, y: 150, packed: false, shouldPack: true, name: 'Dress' },
    { id: 6, emoji: '👟', x: 200, y: 250, packed: false, shouldPack: true, name: 'Shoes' },
    // Items NOT to pack (hostel/roommate items)
    { id: 7, emoji: '🪴', x: 80, y: 150, packed: false, shouldPack: false, name: 'Plant' },
    { id: 8, emoji: '🖼️', x: 220, y: 50, packed: false, shouldPack: false, name: 'Frame' },
    { id: 9, emoji: '🕯️', x: 180, y: 180, packed: false, shouldPack: false, name: 'Candle' },
    { id: 10, emoji: '🧸', x: 120, y: 80, packed: false, shouldPack: false, name: 'Teddy' },
  ]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [wrongItems, setWrongItems] = useState([]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameWon && !gameLost) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameWon) {
      setGameLost(true);
    }
  }, [gameStarted, timeLeft, gameWon, gameLost]);

  useEffect(() => {
    const correctItems = items.filter(item => item.shouldPack && item.packed);
    const incorrectItems = items.filter(item => !item.shouldPack && item.packed);
    
    // Win condition: all correct items packed, no wrong items
    if (correctItems.length === 6 && incorrectItems.length === 0 && gameStarted) {
      setGameWon(true);
      setShowModal(true);
      playSuccessSound();
      hapticFeedback('heavy');
    }
    
    // Lose condition: packed a wrong item
    if (incorrectItems.length > 0) {
      setWrongItems(incorrectItems);
      setGameLost(true);
    }
  }, [items, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(45);
    setGameWon(false);
    setGameLost(false);
    setShowModal(false);
    setWrongItems([]);
    setItems(items.map(item => ({ ...item, packed: false })));
  };

  const handleDrag = (event, info) => {
    const suitcaseElement = document.getElementById('suitcase');
    if (!suitcaseElement) return;

    const suitcaseRect = suitcaseElement.getBoundingClientRect();
    const itemX = info.point.x;
    const itemY = info.point.y;

    const isOver = 
      itemX >= suitcaseRect.left &&
      itemX <= suitcaseRect.right &&
      itemY >= suitcaseRect.top &&
      itemY <= suitcaseRect.bottom;

    setIsDraggingOver(isOver);
  };

  const handleDragEnd = (itemId, event, info) => {
    setIsDraggingOver(false);
    
    const suitcaseElement = document.getElementById('suitcase');
    if (!suitcaseElement) {
      console.log('❌ Suitcase element not found');
      return;
    }

    const suitcaseRect = suitcaseElement.getBoundingClientRect();
    
    // Get the dragged element's position
    const draggedElement = event.target;
    const draggedRect = draggedElement.getBoundingClientRect();
    
    // Use center of dragged element for better detection
    const itemCenterX = draggedRect.left + draggedRect.width / 2;
    const itemCenterY = draggedRect.top + draggedRect.height / 2;

    console.log('🎯 Item center:', { x: itemCenterX, y: itemCenterY });
    console.log('📦 Suitcase bounds:', {
      left: suitcaseRect.left,
      right: suitcaseRect.right,
      top: suitcaseRect.top,
      bottom: suitcaseRect.bottom
    });

    const isOverSuitcase = 
      itemCenterX >= suitcaseRect.left &&
      itemCenterX <= suitcaseRect.right &&
      itemCenterY >= suitcaseRect.top &&
      itemCenterY <= suitcaseRect.bottom;

    console.log('✅ Is over suitcase:', isOverSuitcase);

    if (isOverSuitcase) {
      console.log('🎉 Item packed!', itemId);
      setItems(prevItems => prevItems.map(i => 
        i.id === itemId ? { ...i, packed: true } : i
      ));
      try {
        playPopSound();
        hapticFeedback('medium');
      } catch (error) {
        console.log('⚠️ Sound/haptic error:', error);
      }
    } else {
      console.log('❌ Item not over suitcase, returning to position');
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-cream to-pink-50">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-5xl md:text-6xl text-maroon mb-4 text-center"
      >
        The Shifting Chaos 📦
      </motion.h2>
      
      <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto">
        Remember our hostel shifting days? Help Agrima pack before the warden comes!
      </p>
      
      {/* Packing List */}
      {gameStarted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <h3 className="font-handwriting text-2xl text-maroon mb-3 text-center">
            📋 Packing List (Pack ONLY these!)
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {items.filter(item => item.shouldPack).map(item => (
              <div
                key={item.id}
                className={`px-4 py-2 rounded-full text-lg transition-all ${
                  item.packed
                    ? 'bg-green-200 text-green-800 line-through'
                    : 'bg-pink-100 text-maroon'
                }`}
              >
                {item.emoji} {item.name}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-3 italic">
            ⚠️ Don't pack roommate's stuff! (🪴🖼️🕯️🧸)
          </p>
        </motion.div>
      )}

      {!gameStarted && !gameWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* The Room Container - Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white/50 backdrop-blur-sm rounded-3xl border-4 border-dashed border-maroon/30 p-12 mb-8 min-h-[300px] overflow-hidden"
          >
            <div className="absolute top-4 left-4 font-handwriting text-maroon/60 text-lg">
              Hostel Room 🏠
            </div>
            
            {/* Scattered Props with Floating Animation */}
            {[
              { emoji: '📚', x: '15%', y: '30%', delay: 0 },
              { emoji: '👕', x: '70%', y: '25%', delay: 0.2 },
              { emoji: '☕', x: '40%', y: '50%', delay: 0.4 },
              { emoji: '🧦', x: '60%', y: '60%', delay: 0.6 },
              { emoji: '📖', x: '25%', y: '70%', delay: 0.8 },
              { emoji: '👖', x: '80%', y: '55%', delay: 1 }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-5xl opacity-60"
                style={{ left: item.x, top: item.y }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            {/* Messy Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
              <path d="M 50 50 Q 100 100, 150 50 T 250 50" stroke="#8B2635" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              <path d="M 200 150 Q 250 200, 300 150" stroke="#8B2635" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>
          </motion.div>

          {/* Pulsing Start Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 4px 20px rgba(139, 38, 53, 0.3)',
                '0 8px 30px rgba(139, 38, 53, 0.5)',
                '0 4px 20px rgba(139, 38, 53, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-maroon to-pink-500 text-white px-10 py-5 rounded-full text-2xl font-handwriting shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">Start Packing! 🎒</span>
          </motion.button>
        </motion.div>
      )}

      {gameStarted && (
        <>
          <div className="text-center mb-8">
            <div className="inline-block bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="font-handwriting text-2xl text-maroon">
                Time Left: {timeLeft}s ⏰
              </span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative">
            {/* Messy Room */}
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl border-4 border-dashed border-maroon/30 p-8 min-h-[400px] overflow-visible z-10">
              <h3 className="font-handwriting text-2xl text-maroon mb-4 text-center">
                Messy Room 🌪️
              </h3>
              
              {/* Instruction Hint */}
              {items.filter(item => !item.packed).length === items.length && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 bg-maroon text-white px-4 py-2 rounded-full text-sm font-handwriting shadow-lg z-10 whitespace-nowrap"
                >
                  👆 Find YOUR stuff in the mess! →
                </motion.div>
              )}
              
              {/* Background Clutter - Non-interactive decorative items */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                {/* Scattered papers */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`paper-${i}`}
                    className="absolute w-12 h-16 bg-white border border-gray-300 shadow-sm"
                    style={{
                      left: `${Math.random() * 80 + 5}%`,
                      top: `${Math.random() * 70 + 10}%`,
                      rotate: `${Math.random() * 60 - 30}deg`,
                      zIndex: 1
                    }}
                    animate={{
                      rotate: [
                        `${Math.random() * 60 - 30}deg`,
                        `${Math.random() * 60 - 30}deg`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-xs p-1 text-gray-400">
                      {['📝', '📄', '📋', '🗒️'][Math.floor(Math.random() * 4)]}
                    </div>
                  </motion.div>
                ))}
                
                {/* Scattered small items */}
                {[
                  { emoji: '🔑', x: 15, y: 25 },
                  { emoji: '💄', x: 75, y: 35 },
                  { emoji: '🎧', x: 45, y: 65 },
                  { emoji: '📱', x: 85, y: 55 },
                  { emoji: '⌚', x: 25, y: 75 },
                  { emoji: '🕶️', x: 65, y: 20 },
                  { emoji: '💊', x: 35, y: 45 },
                  { emoji: '🧴', x: 55, y: 80 },
                ].map((item, i) => (
                  <motion.div
                    key={`clutter-${i}`}
                    className="absolute text-2xl"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                ))}
                
                {/* Piles of clothes in corners */}
                <div className="absolute bottom-4 left-4 text-4xl opacity-60">
                  <div className="relative">
                    <span className="absolute" style={{ transform: 'rotate(-15deg)' }}>👚</span>
                    <span className="absolute" style={{ transform: 'rotate(10deg) translate(10px, 5px)' }}>🧥</span>
                    <span className="absolute" style={{ transform: 'rotate(-5deg) translate(5px, 10px)' }}>👔</span>
                  </div>
                </div>
                
                <div className="absolute top-8 right-8 text-3xl opacity-60">
                  <div className="relative">
                    <span className="absolute" style={{ transform: 'rotate(20deg)' }}>🧦</span>
                    <span className="absolute" style={{ transform: 'rotate(-15deg) translate(15px, 8px)' }}>🧦</span>
                    <span className="absolute" style={{ transform: 'rotate(5deg) translate(8px, 15px)' }}>👙</span>
                  </div>
                </div>
                
                {/* Messy lines and scribbles */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <path d="M 20 30 Q 50 50, 80 30 T 140 30" stroke="#8B2635" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                  <path d="M 100 80 Q 130 100, 160 80" stroke="#8B2635" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                  <path d="M 40 120 Q 70 140, 100 120 T 160 120" stroke="#8B2635" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                  <circle cx="30" cy="60" r="15" stroke="#8B2635" strokeWidth="1" fill="none" opacity="0.3" />
                  <circle cx="150" cy="100" r="20" stroke="#8B2635" strokeWidth="1" fill="none" opacity="0.3" />
                </svg>
                
                {/* Coffee stains */}
                <div className="absolute top-20 left-20 w-8 h-8 rounded-full bg-amber-900/20 blur-sm"></div>
                <div className="absolute bottom-32 right-24 w-6 h-6 rounded-full bg-amber-900/20 blur-sm"></div>
              </div>
              
              <div className="relative min-h-[300px] z-20">
                {items.filter(item => !item.packed).map((item, index) => (
                  <motion.div
                    key={item.id}
                    drag
                    dragMomentum={false}
                    dragElastic={0.1}
                    onDrag={handleDrag}
                    onDragEnd={(e, info) => handleDragEnd(item.id, e, info)}
                    initial={{ 
                      x: (index % 4) * 80 + 20, 
                      y: Math.floor(index / 4) * 100 + 20 
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      cursor: 'grab',
                      rotate: 5,
                      filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                      zIndex: 50
                    }}
                    whileDrag={{ 
                      scale: 1.3, 
                      zIndex: 9999, 
                      cursor: 'grabbing',
                      rotate: -10,
                      filter: 'drop-shadow(8px 8px 16px rgba(0,0,0,0.4))'
                    }}
                    className={`absolute text-6xl select-none draggable-item ${
                      !item.shouldPack ? 'opacity-90' : ''
                    }`}
                    style={{ 
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
                      transition: 'filter 0.2s',
                      zIndex: 30
                    }}
                  >
                    {item.emoji}
                    {/* Label for wrong items */}
                    {!item.shouldPack && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-red-500 text-white px-2 py-1 rounded whitespace-nowrap font-sans">
                        Roommate's!
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suitcase */}
            <div 
              id="suitcase"
              className={`relative rounded-3xl p-8 min-h-[400px] shadow-2xl transition-all duration-300 z-0 overflow-hidden ${
                isDraggingOver 
                  ? 'border-green-500 bg-gradient-to-br from-green-100 to-green-200 scale-105' 
                  : 'border-amber-600'
              }`}
              style={{
                background: isDraggingOver 
                  ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                  : 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)',
                borderRadius: '20px',
                border: isDraggingOver ? '6px solid #10b981' : '6px solid #d97706',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.3)'
              }}
            >
              {/* Suitcase Handle */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-12 flex items-end justify-center">
                <div className="w-24 h-10 border-4 border-amber-800 rounded-t-full bg-gradient-to-b from-amber-700 to-amber-800"
                  style={{
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="w-full h-2 bg-amber-900 rounded-t-full mt-1"></div>
                </div>
              </div>

              {/* Suitcase Latches */}
              <div className="absolute top-4 left-4 w-8 h-3 bg-gray-700 rounded-sm shadow-md"></div>
              <div className="absolute top-4 right-4 w-8 h-3 bg-gray-700 rounded-sm shadow-md"></div>
              
              {/* Suitcase Straps */}
              <div className="absolute top-1/3 left-0 right-0 h-6 bg-amber-800/30 border-t-2 border-b-2 border-amber-900/50"></div>
              <div className="absolute top-2/3 left-0 right-0 h-6 bg-amber-800/30 border-t-2 border-b-2 border-amber-900/50"></div>

              {/* Corner Protectors */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-gray-800 rounded-sm shadow-lg"></div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-800 rounded-sm shadow-lg"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-gray-800 rounded-sm shadow-lg"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-gray-800 rounded-sm shadow-lg"></div>

              {/* Suitcase Texture Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-0 right-0 h-px bg-amber-900"
                    style={{ top: `${(i + 1) * 12}%` }}
                  />
                ))}
              </div>

              <h3 className="font-handwriting text-2xl text-maroon mb-4 text-center relative z-10">
                Suitcase 🧳
              </h3>
              
              {/* Drop Zone Indicator */}
              {isDraggingOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-green-400/20 rounded-3xl flex items-center justify-center pointer-events-none z-20"
                >
                  <p className="text-4xl font-handwriting text-green-600 drop-shadow-lg">Drop Here! 📦</p>
                </motion.div>
              )}
              <div className="flex flex-wrap gap-4 justify-center items-center min-h-[300px]">
                <AnimatePresence>
                  {items.filter(item => item.packed).map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0, rotate: -180, x: -100 }}
                      animate={{ scale: 1, rotate: 0, x: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-5xl relative"
                    >
                      {item.emoji}
                      {/* Success Sparkle */}
                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ 
                          scale: [0, 2, 0],
                          opacity: [1, 1, 0]
                        }}
                        transition={{ duration: 0.6 }}
                        className="absolute -top-2 -right-2 text-2xl"
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Packing Progress Indicator */}
                {items.filter(item => item.packed).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-lg"
                  >
                    <p className="font-handwriting text-maroon">
                      {items.filter(item => item.shouldPack && item.packed).length} / 6 correct! 
                      {items.filter(item => item.shouldPack && item.packed).length === 6 ? ' 🎉' : ' 📦'}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {(timeLeft === 0 || gameLost) && !gameWon && (
        <div className="text-center mt-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl"
          >
            {gameLost && wrongItems.length > 0 ? (
              <>
                <p className="text-6xl mb-4">😅</p>
                <h3 className="font-handwriting text-3xl text-maroon mb-4">
                  Oops! Wrong Item!
                </h3>
                <p className="text-xl text-gray-600 mb-4">
                  You packed: {wrongItems.map(i => i.emoji).join(' ')}
                </p>
                <p className="text-gray-500 mb-6">
                  That's your roommate's stuff! 😄<br/>
                  Only pack items from the list!
                </p>
              </>
            ) : (
              <>
                <p className="text-6xl mb-4">⏰</p>
                <h3 className="font-handwriting text-3xl text-maroon mb-4">
                  Time's Up!
                </h3>
                <p className="text-xl text-gray-600 mb-6">
                  But we always had fun shifting anyway! 😄
                </p>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-maroon to-pink-500 text-white px-8 py-4 rounded-full text-xl font-handwriting shadow-xl"
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Win Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            {/* Fireworks Effect */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
                className="absolute text-4xl pointer-events-none"
              >
                {['🎉', '✨', '🎊', '⭐', '💫', '🌟', '💕', '🎈'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}

            {/* Success Rays */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 3,
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute w-2 h-40 bg-gradient-to-t from-gold to-transparent origin-bottom pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg)`
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.3, rotate: -20, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.8, rotate: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl p-8 md:p-12 max-w-md text-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-maroon via-pink-500 to-gold opacity-20 blur-xl"
              />

              {/* Trophy Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  scale: { type: "spring", stiffness: 200, delay: 0.2 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-8xl mb-4"
              >
                🏆
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-handwriting text-5xl text-maroon mb-4 relative z-10"
              >
                Bestest Roomie Forever!
              </motion.h3>

              {/* Photo Placeholder with Polaroid Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="bg-white p-4 pb-12 rounded-lg shadow-xl mb-6 relative"
              >
                {/* Scotch Tape */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/70 -rotate-6 shadow-sm">
                  <div className="absolute inset-0 border-t border-b border-yellow-200/50"></div>
                </div>

                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded aspect-[4/3] flex items-center justify-center border-2 border-gray-200 overflow-hidden">
                  <img 
                    src={shiftingPhoto} 
                    alt="Shifting partners forever"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwriting text-lg text-gray-700 text-center mt-3">
                  Shifting partners forever 📦
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-gray-600 mb-6 relative z-10"
              >
                We make the perfect shifting partners! 💪
              </motion.p>

              {/* Buttons */}
              <div className="flex gap-4 justify-center relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-full font-handwriting text-lg text-gray-700 transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  animate={{
                    boxShadow: [
                      '0 4px 20px rgba(139, 38, 53, 0.3)',
                      '0 8px 30px rgba(139, 38, 53, 0.5)',
                      '0 4px 20px rgba(139, 38, 53, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-6 py-3 bg-gradient-to-r from-maroon to-pink-500 text-white rounded-full font-handwriting text-lg shadow-lg relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <span className="relative z-10">Play Again</span>
                </motion.button>
              </div>

              {/* Floating Hearts */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 50]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute bottom-0 text-2xl pointer-events-none"
                  style={{ left: `${20 + i * 15}%` }}
                >
                  💕
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShiftingChaos;
