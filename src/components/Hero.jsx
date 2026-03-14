import { motion } from 'framer-motion'
import ASCIIText from './ASCIIText'
import ColorBends from './ColorBends'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-40">
      {/* ColorBends background */}
      <div className="absolute inset-0">
        <ColorBends
          speed={0.1}
          noise={0}
          mouseInfluence={0.4}
          transparent={false}
        />
      </div>

      {/* Bottom fade — blends hero into next section's bg color */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '60%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(17,24,39,0.15) 30%, rgba(17,24,39,0.5) 55%, rgba(17,24,39,0.85) 75%, #111827 100%)',
        }}
      />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto w-full">
        <motion.span
          className="inline-block px-4 py-1.5 mb-8 text-sm font-medium rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          AI-Powered Career Roadmaps
        </motion.span>

        <motion.div
          className="relative w-full h-40 md:h-56 mb-6"
          style={{ overflow: 'visible' }}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <ASCIIText
            text="SkillSet LA"
            asciiFontSize={5}
            textFontSize={250}
            textColor="#FFFFFF"
            planeBaseHeight={10}
            enableWaves={true}
          />
        </motion.div>

        <motion.a
          href="#input-form"
          className="inline-block px-8 py-3.5 font-semibold text-base rounded-lg
                     transition-all duration-300 cursor-pointer
                     bg-white/10 text-white backdrop-blur-md
                     border border-white/20 hover:bg-white/20 hover:border-white/30"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started →
        </motion.a>
      </div>
    </section>
  )
}
