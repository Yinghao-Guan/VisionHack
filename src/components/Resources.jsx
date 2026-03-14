import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

const typeBadgeColors = {
  'Free Online Course': 'bg-green-100 text-green-700',
  'Online Course': 'bg-blue-100 text-blue-700',
  'Community College': 'bg-purple/15 text-purple',
  'Certificate Program': 'bg-orange/15 text-orange',
  'In-Person Workshop': 'bg-pink/15 text-pink',
  'Free Software': 'bg-green-100 text-green-700',
  'Practice Dataset': 'bg-blue-100 text-blue-700',
}

export default function Resources({ data }) {
  return (
    <SectionWrapper className="bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade-up font-heading text-3xl md:text-4xl font-bold text-dark-purple text-center mb-3">
          Free LA Resources
        </h2>
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Local and online resources to help you learn — many are completely free.
        </p>

        <div className="space-y-10">
          {data.map((group, groupIdx) => (
            <div key={group.skill} className="gsap-fade-up">
              <h3 className="text-xl font-semibold text-dark-purple mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange" />
                {group.skill}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    className="glass-card p-5 hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: (groupIdx * 2 + itemIdx) * 0.05, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-dark-purple">{item.name}</h4>
                    </div>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                        typeBadgeColors[item.type] || 'bg-sand text-dark-purple'
                      }`}
                    >
                      {item.type}
                    </span>
                    <p className="text-light-text text-sm">{item.availability}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
