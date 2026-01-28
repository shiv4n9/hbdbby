import { motion } from 'framer-motion';

const BirthdayWishes = () => {
  const wishes = [
    {
      id: 1,
      emoji: '🎂',
      message: 'To the girl with the prettiest smile and the kindest heart - Happy Birthday Twin!',
      color: 'from-pink-100 to-pink-200'
    },
    {
      id: 2,
      emoji: '🎉',
      message: 'You are proof that magic exists. Have the most magical birthday!',
      color: 'from-purple-100 to-purple-200'
    },
    {
      id: 3,
      emoji: '✨',
      message: 'Tareef karun kya uski, jisne tumhe banaya! Happy Birthday beautiful!',
      color: 'from-orange-100 to-orange-200'
    },
    {
      id: 4,
      emoji: '🌟',
      message: "You're not just a year older, you're a year more awesome!",
      color: 'from-blue-100 to-blue-200'
    },
    {
      id: 5,
      emoji: '💕',
      message: 'Happy Birthday to our very own Param Sundari!',
      color: 'from-pink-100 to-pink-200'
    },
    {
      id: 6,
      emoji: '🌸',
      message: 'Happy Birthday to the human version of sunshine!',
      color: 'from-purple-100 to-purple-200'
    },
    {
      id: 7,
      emoji: '😍',
      message: "If 'Elegance' had a Wikipedia page, your photo would be the main thumbnail.",
      color: 'from-pink-100 to-pink-200'
    },
    {
      id: 8,
      emoji: '👑',
      message: 'Cheers to you, the birthday queen!',
      color: 'from-yellow-100 to-yellow-200'
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating Confetti Background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`confetti-bg-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#FF69B4', '#FFD700', '#8B2635', '#D4AF37'][i % 4],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            animate={{
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="font-handwriting text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4"
          >
            🎂 HAPPIEEE BIRTHDAY CUTIE-PIE 🎂
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-pink-600 font-handwriting"
          >
            For the most amazing Shaambhavi! 🌸
          </motion.p>
        </motion.div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                y: -10,
                zIndex: 10
              }}
              className={`relative bg-gradient-to-br ${wish.color} p-6 rounded-2xl shadow-lg cursor-pointer group`}
              style={{
                rotate: `${(index % 2 === 0 ? 1 : -1) * 2}deg`
              }}
            >
              {/* Pin/Balloon on top */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl"
              >
                🎈
              </motion.div>

              {/* Emoji Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4 text-center"
              >
                {wish.emoji}
              </motion.div>

              {/* Message */}
              <p className="text-gray-700 text-center font-medium leading-relaxed">
                {wish.message}
              </p>

              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-xl"
                    style={{
                      left: `${25 + i * 25}%`,
                      top: `${25 + (i % 2) * 50}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl relative overflow-hidden"
        >
          {/* Decorative balloons */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 left-8 text-4xl"
          >
            🎈
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-4 right-8 text-4xl"
          >
            🎈
          </motion.div>

          <motion.h3
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="font-handwriting text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4"
          >
            Have the Most Amazing Birthday! 🎉
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-pink-600 font-handwriting"
          >
            You deserve all the happiness in the world!
          </motion.p>

          {/* Floating hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-2xl"
              style={{
                left: `${10 + i * 15}%`,
                bottom: '10%'
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              💕
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BirthdayWishes;
