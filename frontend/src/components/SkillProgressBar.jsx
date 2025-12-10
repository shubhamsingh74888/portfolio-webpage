import { motion } from 'framer-motion'

export default function SkillProgressBar({ skill, index }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ 
            duration: 1, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
        />
      </div>
    </div>
  )
}
