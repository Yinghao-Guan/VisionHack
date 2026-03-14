import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-dark-purple text-white/80 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h3
          className="font-heading text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SkillSet LA
        </motion.h3>
        <motion.p
          className="text-white/40 text-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Empowering Los Angeles residents to build new careers, one skill at a time.
        </motion.p>
        <motion.div
          className="w-16 h-[2px] mx-auto bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-400 rounded-full mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.p
          className="text-white/25 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Built with care for the people of LA. This is a mockup — real AI features coming soon.
        </motion.p>
      </div>
    </footer>
  )
}
