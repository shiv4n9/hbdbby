import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TwinQuiz = () => {
  const questions = [
    {
      id: 1,
      question: "What is her go-to comfort food?",
      options: ["Pizza 🍕", "Ice Cream 🍦", "Biryani 🍛", "Chocolate 🍫"],
      correct: 3,
      feedback: ["Not quite!", "Close!", "Try again!", "Yasss! 🎉"]
    },
    {
      id: 2,
      question: "Who takes longer to get ready?",
      options: ["Me 😅", "Her 💅", "We're both quick ⚡", "Depends on the mood 🤷"],
      correct: 3,
      feedback: ["Hmm...", "Not really!", "Nice try!", "Haha yes! 💯"]
    },
    {
      id: 3,
      question: "What is her most used slang word?",
      options: ["Bestie 💕", "Literally 🙄", "Vibe ✨", "Slay 💅"],
      correct: 3,
      feedback: ["Close!", "Not really!", "Almost!", "Yesss slay! 🎊"]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <section className="py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwriting text-5xl md:text-6xl mb-12 text-center"
        >
          Are We Really Twins? 👯‍♀️
        </motion.h2>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl"
        >
          <h3 className="font-handwriting text-4xl text-maroon mb-4">Quiz Complete!</h3>
          <p className="text-3xl font-bold text-gray-700 my-6">
            You scored: {score}/{questions.length}
          </p>
          <div className="bg-gradient-to-br from-pink-100 to-purple-200 p-8 rounded-2xl">
            <p className="font-handwriting text-3xl text-pink-600 mb-4">
              We need more twin time! 💕
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              No matter the score, we should spend more time together nonetheless... Miss you! 🥺✨
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetQuiz}
            className="mt-6 bg-gradient-to-r from-maroon to-pink-500 text-white px-8 py-3 rounded-full text-lg font-handwriting shadow-lg"
          >
            Take Quiz Again
          </motion.button>
        </motion.div>
      </section>
    );
  }
            Take Quiz Again
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-5xl md:text-6xl mb-12 text-center"
      >
        Are We Really Twins? 🐼👯‍♀️
      </motion.h2>
      <motion.div
        initial={{ rotate: -2 }}
        whileHover={{ rotate: 0 }}
        className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-sm text-gray-500 uppercase tracking-wide mb-4 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h3 className="font-handwriting text-3xl text-gray-700 mb-8 text-center leading-relaxed">
          {questions[currentQuestion].question}
        </h3>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: showFeedback ? 1 : 1.02, x: showFeedback ? 0 : 10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !showFeedback && handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-2xl text-lg transition-all ${
                showFeedback && index === selectedAnswer
                  ? index === questions[currentQuestion].correct
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                    : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 text-gray-700 border-2 border-pink-200'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-6 p-4 rounded-2xl text-center font-handwriting text-xl ${
                selectedAnswer === questions[currentQuestion].correct
                  ? 'bg-green-100 text-green-700'
                  : 'bg-pink-100 text-pink-700'
              }`}
            >
              {questions[currentQuestion].feedback[selectedAnswer]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default TwinQuiz;
