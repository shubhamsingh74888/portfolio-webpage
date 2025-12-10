import { motion } from 'framer-motion'
import { 
  CloudIcon,
  ServerIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CodeBracketIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: CloudIcon,
    skills: [
      { name: 'AWS', level: 95, color: 'from-orange-500 to-yellow-500' },
      { name: 'Azure', level: 90, color: 'from-blue-500 to-cyan-500' },
      { name: 'Google Cloud', level: 85, color: 'from-green-500 to-emerald-500' },
      { name: 'DigitalOcean', level: 80, color: 'from-blue-400 to-cyan-400' }
    ]
  },
  {
    title: 'Containerization',
    icon: ServerIcon,
    skills: [
      { name: 'Docker', level: 95, color: 'from-blue-500 to-indigo-500' },
      { name: 'Kubernetes', level: 92, color: 'from-blue-600 to-cyan-500' },
      { name: 'Docker Compose', level: 88, color: 'from-blue-400 to-indigo-400' },
      { name: 'Podman', level: 75, color: 'from-purple-500 to-pink-500' }
    ]
  },
  {
    title: 'Infrastructure as Code',
    icon: CodeBracketIcon,
    skills: [
      { name: 'Terraform', level: 94, color: 'from-purple-500 to-pink-500' },
      { name: 'CloudFormation', level: 85, color: 'from-orange-500 to-amber-500' },
      { name: 'Ansible', level: 82, color: 'from-red-500 to-orange-500' },
      { name: 'Pulumi', level: 70, color: 'from-yellow-500 to-red-500' }
    ]
  },
  {
    title: 'CI/CD Tools',
    icon: ChartBarIcon,
    skills: [
      { name: 'Jenkins', level: 90, color: 'from-red-500 to-pink-500' },
      { name: 'GitLab CI', level: 88, color: 'from-orange-500 to-red-500' },
      { name: 'GitHub Actions', level: 85, color: 'from-gray-700 to-gray-900' },
      { name: 'CircleCI', level: 80, color: 'from-green-600 to-emerald-500' }
    ]
  },
  {
    title: 'Monitoring & Logging',
    icon: CpuChipIcon,
    skills: [
      { name: 'Prometheus', level: 88, color: 'from-orange-500 to-red-500' },
      { name: 'Grafana', level: 90, color: 'from-orange-600 to-red-600' },
      { name: 'ELK Stack', level: 85, color: 'from-green-500 to-emerald-500' },
      { name: 'Datadog', level: 82, color: 'from-purple-600 to-pink-600' }
    ]
  },
  {
    title: 'Security Tools',
    icon: ShieldCheckIcon,
    skills: [
      { name: 'Trivy', level: 85, color: 'from-blue-500 to-cyan-500' },
      { name: 'SonarQube', level: 83, color: 'from-purple-500 to-pink-500' },
      { name: 'Aqua Security', level: 80, color: 'from-green-500 to-teal-500' },
      { name: 'Hashicorp Vault', level: 78, color: 'from-yellow-500 to-orange-500' }
    ]
  }
]

export default function SkillsOverview() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Technical Skills & Tools
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Comprehensive expertise across the DevOps toolchain and cloud ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {category.title}
              </h3>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
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
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
