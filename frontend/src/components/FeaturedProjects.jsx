import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ServerIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import ProjectCard, { ProjectModal } from './ProjectCard'

const featuredProjects = [
  {
    id: 1,
    title: 'wanderlust-infra — AWS Infrastructure',
    description: '41 AWS resources via modular Terraform with S3/DynamoDB remote state locking and CloudWatch alarms.',
    detailedDescription: 'Provisioned 41 AWS resources via modular Terraform with S3/DynamoDB remote state locking. Diagnosed Terraform destroy failures from orphaned ALBs and built automated cleanup in Jenkins Shared Library. Configured CloudWatch alarms routed to SNS for sub-60-second incident detection.',
    technologies: [
      { name: 'Terraform' }, { name: 'AWS' }, { name: 'CloudWatch' }, { name: 'Jenkins' }, { name: 'EKS' }
    ],
    tools: ['Jenkins Shared Library', 'SNS', 'S3', 'DynamoDB'],
    features: [
      'Modular IaC with remote state locking',
      'Automated cleanup of orphaned ALBs',
      'Sub-60s incident detection via CloudWatch + SNS',
      'Runbook documentation'
    ],
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    repository: 'https://github.com/shubhamsingh74888/wanderlust-infra',
    status: 'completed',
    metrics: { resources: '41 AWS', alertTime: '< 60s', stateBackend: 'S3+DynamoDB' }
  },
  {
    id: 2,
    title: 'Wanderlust-Mega-Project — CI/CD & GitOps',
    description: 'Full CI/CD pipeline with ArgoCD GitOps, SonarQube quality gates, Trivy scanning, and Prometheus monitoring.',
    detailedDescription: 'Diagnosed a CI/CD race condition between GitOps push and ArgoCD sync by refactoring pipelines. Troubleshot ArgoCD OutOfSync failures from immutable StorageClass fields. Integrated SNS alerts into Jenkins post-build hooks and operated SonarQube quality gates and Trivy scanning.',
    technologies: [
      { name: 'Kubernetes' }, { name: 'ArgoCD' }, { name: 'Jenkins' }, { name: 'Docker' }, { name: 'Prometheus' }
    ],
    tools: ['Helm', 'SonarQube', 'Trivy', 'Grafana', 'Loki'],
    features: [
      'GitOps with ArgoCD sync policies',
      'SAST via SonarQube quality gates',
      'Container scanning with Trivy',
      'Prometheus + Grafana monitoring stack'
    ],
    category: 'CI/CD',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800',
    status: 'completed',
    metrics: { pipeline: 'GitOps', scanning: 'SAST+Container', monitoring: 'Prometheus' }
  },
  {
    id: 3,
    title: 'Battery RUL Prediction — ML Pipeline',
    description: 'End-to-end ML pipeline on NASA PCoE dataset predicting battery remaining useful life, reducing manual effort by 40%.',
    detailedDescription: 'Built Battery RUL prediction pipeline on NASA dataset during CSIR-IIP internship. Evaluated 4 ML models via leave-one-battery-out CV. Automated ETL pipelines using Python and Bash, reducing manual data handling effort by 40%.',
    technologies: [
      { name: 'Python' }, { name: 'XGBoost' }, { name: 'Pandas' }, { name: 'scikit-learn' }
    ],
    tools: ['Bash', 'Git', 'Jupyter', 'NumPy', 'Matplotlib'],
    features: [
      'Leave-one-battery-out cross-validation',
      '4 ML models evaluated and compared',
      'Automated ETL with Python + Bash',
      '40% reduction in manual data handling'
    ],
    category: 'Automation',
    image: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=800',
    repository: 'https://github.com/shubhamsingh74888/battery_RUL_prediction',
    status: 'completed',
    metrics: { effortReduction: '40%', models: '4 ML models', dataset: 'NASA PCoE' }
  }
]

function FeaturedCard({ project, index }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        onClick={() => setShowModal(true)}
        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-semibold rounded-full">
            {project.category}
          </span>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-3 py-1 bg-white/90 text-gray-900 text-xs font-semibold rounded-full">
              Click for details
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-md"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 text-[10px] rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5 text-center">
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 truncate">{val}</p>
                <p className="text-[9px] text-gray-400 capitalize truncate">{key.replace(/([A-Z])/g, ' $1')}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1 text-[10px] text-green-500">
              <CheckCircleIcon className="w-3 h-3" />
              <span>Completed</span>
            </div>
            <span className="text-[10px] text-blue-500 font-medium group-hover:underline">
              View details →
            </span>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <ProjectModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

// Re-export ProjectModal so FeaturedProjects can use it
// We import it inline above — this is a named export from ProjectCard
// Actually let's define it here directly to avoid circular imports:

export default function FeaturedProjects() {
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/30">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Projects
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real DevOps implementations — click any card to explore
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-full shadow transition-all"
          >
            View All Projects
            <ServerIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
