import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const skills = [
  { name: 'AWS',        level: 95, color: '#F97316' },
  { name: 'Docker',     level: 95, color: '#3B82F6' },
  { name: 'Terraform',  level: 94, color: '#A855F7' },
  { name: 'Kubernetes', level: 92, color: '#06B6D4' },
  { name: 'Linux',      level: 90, color: '#EAB308' },
  { name: 'Python',     level: 85, color: '#22C55E' },
]

const levels = [
  { label: 'Expert'     },
  { label: 'Advanced'   },
  { label: 'Proficient' },
  { label: 'Familiar'   },
]

export default function SkillsOverview() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Core Skills
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Technologies I work with every day
          </p>
        </div>

        {/* Chart */}
        <div className="relative">

          {/* Horizontal grid lines + labels */}
          <div
            className="absolute inset-0 flex flex-col justify-between pointer-events-none"
            style={{ bottom: '2.5rem', top: 0 }}
          >
            {levels.map((l) => (
              <div key={l.label} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 dark:text-gray-500 w-20 text-right shrink-0">
                  {l.label}
                </span>
                <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 pt-4 pb-10 pl-24">
            {skills.map((skill, i) => (
              <div key={skill.name} className="flex flex-col items-center gap-2 flex-1 max-w-[120px]">
                <div className="relative w-full flex items-end" style={{ height: '220px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                    style={{ backgroundColor: skill.color }}
                    className="w-full rounded-t-xl flex items-end justify-center pb-3"
                  >
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white">{skill.level}</span>
                      <span className="text-sm text-white/80">%</span>
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-blue-500/25 hover:shadow-xl"
          >
            View Full Skills
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
