import { motion } from 'framer-motion'
import ASCIIText from './ASCIIText'

export default function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating blobs */}
      <div
        className="blob w-72 h-72 bg-orange top-[10%] left-[10%]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="blob w-96 h-96 bg-pink top-[50%] right-[5%]"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="blob w-64 h-64 bg-purple bottom-[15%] left-[30%]"
        style={{ animationDelay: '4s' }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.img
          src="/SkillsetLAlogo.svg"
          alt="SkillMatch LA logo"
          className="mx-auto mb-8 w-32 md:w-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.div
          className="relative w-full h-32 md:h-44 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <ASCIIText
            text="Find Your Path to a New Career"
            textFontSize={80}
            textColor="#FFFFFF"
            enableWaves={true}
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-body leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.88)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          An AI-powered roadmap builder helping Los Angeles residents bridge the
          gap between where they are and where they want to be.
        </motion.p>

        <motion.a
          href="#input-form"
          className="inline-block px-8 py-4 font-semibold text-lg rounded-full
                     shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          style={{ backgroundColor: '#FFFFFF', color: '#4A3560' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Your Journey
        </motion.a>
      </div>
    </section>
  )
}
