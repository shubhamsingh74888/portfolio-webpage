import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
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
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-100 dark:border-orange-800/30',
    skills: [
      { name: 'AWS', level: 90, note: 'EC2, S3, Lambda, EKS, CloudWatch, IAM' },
      { name: 'Azure', level: 50, note: 'AKS, Blob Storage, Azure DevOps' },
      { name: 'Google Cloud', level: 50, note: 'GKE, Cloud Run, BigQuery basics' },
    ]
  },
  {
    title: 'Containerization & IaC',
    icon: ServerIcon,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-100 dark:border-blue-800/30',
    skills: [
      { name: 'Docker', level: 90, note: 'Multi-stage builds, Compose, optimization' },
      { name: 'Kubernetes (EKS)', level: 85, note: 'Deployments, Helm, StorageClass, ArgoCD' },
      { name: 'Terraform', level: 85, note: 'Modules, remote state, S3/DynamoDB locking' },
    ]
  },
  {
    title: 'CI/CD & Monitoring',
    icon: ChartBarIcon,
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-100 dark:border-purple-800/30',
    skills: [
      { name: 'Jenkins', level: 85, note: 'Shared Libraries, pipelines, SNS hooks' },
      { name: 'ArgoCD', level: 80, note: 'GitOps, sync policies, OutOfSync resolution' },
      { name: 'Prometheus & Grafana', level: 80, note: 'Alerting, dashboards, Loki integration' },
      { name: 'CloudWatch', level: 85, note: 'Alarms, log groups, metric filters' },
    ]
  },
  {
    title: 'Scripting & Automation',
    icon: CodeBracketIcon,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-100 dark:border-green-800/30',
    skills: [
      { name: 'Linux / Bash', level: 85, note: 'ETL pipelines, system automation, cron' },
      { name: 'Python', level: 85, note: 'ML pipelines, boto3, data processing' },
      { name: 'Git', level: 90, note: 'Branching strategies, PR workflows, GitHub Actions' },
    ]
  }
]

const getLevelLabel = (level) => {
  if (level >= 88) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 60) return 'Intermediate'
  return 'Beginner'
}

const getLevelColor = (level) => {
  if (level >= 88) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
  if (level >= 80) return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400'
  if (level >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400'
  return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400'
}

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills | Shubham Singh — DevOps Engineer</title>
        <meta name="description" content="Technical skills and expertise in DevOps, Cloud, CI/CD, and automation" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Technical Skills
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl">
              Hands-on expertise across the DevOps toolchain — from cloud infrastructure
              to CI/CD automation and scripting.
            </p>
          </motion.div>

          {/* Skill categories */}
          <div className="space-y-6">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIndex * 0.1 }}
                className={`${category.bg} border ${category.border} rounded-2xl p-6`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-9 h-9 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                      {/* Skill name + badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getLevelColor(skill.level)}`}>
                          {getLevelLabel(skill.level)}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: skillIndex * 0.08 }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        />
                      </div>

                      {/* Percentage + note */}
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                          {skill.note}
                        </p>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'ArgoCD',
                'Prometheus', 'Grafana', 'AWS EKS', 'SonarQube', 'Trivy',
                'Helm', 'Git', 'Linux', 'Python', 'Bash', 'CloudWatch',
                'SNS', 'S3', 'DynamoDB', 'Lambda', 'EventBridge', 'Athena',
                'MongoDB', 'Pandas', 'XGBoost', 'Jupyter', 'Nodemon'
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  )
}
