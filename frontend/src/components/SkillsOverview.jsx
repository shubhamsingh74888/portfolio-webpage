import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CloudIcon,
  ServerIcon,
  CodeBracketIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: CloudIcon,
    color: 'from-orange-500 to-yellow-500',
    skills: [
      { name: 'AWS', level: 90 },
      { name: 'Azure', level: 50 },
      { name: 'Google Cloud', level: 50 },
    ]
  },
  {
    title: 'Containerization & IaC',
    icon: ServerIcon,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes (EKS)', level: 85 },
      { name: 'Terraform', level: 85 },
    ]
  },
  {
    title: 'CI/CD & Monitoring',
    icon: ChartBarIcon,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Jenkins', level: 85 },
      { name: 'ArgoCD', level: 80 },
      { name: 'Prometheus & Grafana', level: 80 },
      { name: 'CloudWatch', level: 85 },
    ]
  },
  {
    title: 'Scripting & Automation',
    icon: CodeBracketIcon,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Linux / Bash', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'Git', level: 90 },
    ]
  }
]

export default function SkillsOverview() {
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Technical Skills
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Core DevOps toolchain expertise
          </p>
        </div>

        {/* Grid — 4 columns, compact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-7 h-7 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xs font-semibold text-gray-800 dark:text-white leading-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: skillIndex * 0.1 + index * 0.05 }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            View all skills →
          </Link>
        </div>
      </div>
    </section>
  )
}
