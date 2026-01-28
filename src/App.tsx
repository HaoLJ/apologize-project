import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, PartyPopper, Frown } from 'lucide-react'
import confetti from 'canvas-confetti'
import clsx from 'clsx'

function App() {
  const [isForgiven, setIsForgiven] = useState(false)
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 })
  const [hoverCount, setHoverCount] = useState(0)

  const handleForgive = () => {
    setIsForgiven(true)
    
    // Initial burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#db2777', '#f472b6', '#ffffff']
    })

    // Continuous celebration
    const duration = 3000
    const end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#db2777', '#fbcfe8']
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#db2777', '#fbcfe8']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  const moveNoButton = () => {
    // Calculate random position within a reasonable range
    // but ensure it moves away enough to be noticeable
    const newX = (Math.random() - 0.5) * 300
    const newY = (Math.random() - 0.5) * 200
    setNoBtnPosition({ x: newX, y: newY })
    setHoverCount(prev => prev + 1)
  }

  const getNoBtnText = () => {
    const texts = [
      "不原谅", 
      "真的不原谅吗？", 
      "再考虑一下呗", 
      "求求你了", 
      "我会听话的", 
      "给个机会嘛", 
      "不要这样子", 
      "我买好吃的给你", 
      "行行行，都听你的", 
      "点原谅嘛！"
    ]
    return texts[Math.min(hoverCount, texts.length - 1)]
  }

  // Calculate Yes button scale based on hoverCount
  const yesButtonScale = 1 + (hoverCount * 0.1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center p-4 overflow-hidden font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center space-y-8 relative z-10 border border-white/50"
      >
        {/* Header Icon */}
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              scale: isForgiven ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: isForgiven ? [0, 10, -10, 0] : [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: isForgiven ? 0.5 : 2,
              ease: "easeInOut"
            }}
          >
             {isForgiven ? (
               <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-lg" />
             ) : (
               <Frown className="w-24 h-24 text-pink-400 drop-shadow-lg" />
             )}
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1 
          key={isForgiven ? "forgiven" : "apology"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide"
        >
          {isForgiven ? "爱你！" : "老婆，我错啦..."}
        </motion.h1>

        {/* Content */}
        <motion.div 
          layout
          className="space-y-4"
        >
          <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">
            {isForgiven
              ? "谢谢亲爱的原谅我！我会加倍对你好，不让你受委屈。开心开心开心！"
              : "晓燕宝宝，又惹你生气不开心了，真的对不起。我知道是我不好，没有顾及你的感受。你说的我都铭记于心，我一定好好爱你，好好经营我们的家，请你大人不记小人过，原谅我好不好？"}
          </p>
          {/* {!isForgiven && (
            <p className="text-pink-400 text-sm italic">
              (点击左边按钮原谅我，右边按钮...你点不到的)
            </p>
          )} */}
        </motion.div>

        {/* Buttons Area */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4 min-h-[120px] relative">
            {!isForgiven ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 * yesButtonScale }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleForgive}
                  style={{ transformOrigin: 'center' }}
                  animate={{ scale: yesButtonScale }}
                  className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2 z-20"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  {hoverCount > 5 ? "好啦，原谅我吧！" : "原谅我"}
                </motion.button>

                <motion.button
                  animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton} // For mobile tap
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-full font-bold text-lg shadow-md transition-colors whitespace-nowrap absolute sm:static"
                >
                  {getNoBtnText()}
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="flex items-center gap-2 text-pink-600 font-bold text-xl"
              >
                <PartyPopper className="w-8 h-8" />
                <span>给你跪搓衣板</span>
              </motion.div>
            )}
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/40"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            <Heart size={Math.random() * 30 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default App
