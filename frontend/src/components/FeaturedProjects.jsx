import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  ServerIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const featuredProjects = [
  {
    id: 1,
    title: 'Wanderlust DevSecOps Pipeline',
    description: '10-stage Jenkins CI/CD pipeline with SonarQube SAST, OWASP, Trivy scans, Docker Hub push, and ArgoCD GitOps delivery on AWS EKS.',
    technologies: ['Jenkins', 'SonarQube', 'Trivy', 'OWASP', 'Docker', 'ArgoCD'],
    category: 'DevSecOps',
    image: '/thumbnails/pipeline1.png',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    githubUrl: 'https://github.com/shubhamsingh74888/Wanderlust-Mega-Project',
    metrics: { Stages: '10', Security: 'SAST+SCA', Deploy: 'GitOps' }
  },
  {
    id: 2,
    title: 'Wanderlust EKS Infrastructure',
    description: 'Modular Terraform AWS EKS cluster with Packer AMI, Jenkins CI server, Prometheus/Grafana monitoring, ArgoCD, and Helm-based delivery.',
    technologies: ['Terraform', 'AWS EKS', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD'],
    category: 'Infrastructure',
    image: '/thumbnails/pipeline2.png',
    fallback: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=800',
    githubUrl: 'https://github.com/shubhamsingh74888/wanderlust-infra',
    metrics: { Resources: '41', Modules: '3', Region: 'ap-south-1' }
  },
  {
    id: 3,
    title: 'Stock Price Serverless Pipeline',
    description: 'Event-driven AWS pipeline — S3 upload triggers Lambda which parses stock CSVs and stores to DynamoDB. Fully managed with Terraform.',
    technologies: ['AWS Lambda', 'S3', 'DynamoDB', 'Terraform', 'Python', 'CloudWatch'],
    category: 'Serverless',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800',
    githubUrl: '#',
    metrics: { Trigger: 'S3', Runtime: 'Python', Storage: 'DynamoDB' }
  },
  {
    id: 4,
    title: 'Battery RUL Prediction',
    description: 'ML pipeline predicting battery remaining useful life using Linear Regression, Random Forest, and XGBoost with Flask API and dashboard.',
    technologies: ['Python', 'XGBoost', 'Flask', 'Pandas', 'Scikit-learn', 'CSIR-IIP'],
    category: 'ML / AI',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=800',
    githubUrl: '#',
    metrics: { Models: '3', Accuracy: '~94%', API: 'Flask' }
  }
]

export default function FeaturedProjects() {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  const total = featuredProjects.length

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  const visible = [
    featuredProjects[(current - 1 + total) % total],
    featuredProjects[current],
    featuredProjects[(current + 1) % total],
  ]

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Real-world DevOps implementations with measurable results
          </p>
        </div>

        <div className="relative px-6">

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visible.map((project, i) => {
              const isCenter = i === 1
              const imgSrc = imgErrors[project.id] && project.fallback
                ? project.fallback
                : project.image

              return (
                <motion.div
                  key={`${project.id}-${current}-${i}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ duration: 0.35 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/projects/${project.id}`} className="block relative h-52 overflow-hidden bg-gray-900">
                    <img
                      src={imgSrc}
                      alt={project.title}
                      onError={() => setImgErrors(prev => ({ ...prev, [project.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-full">
                        View Details
                      </span>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link to={`/projects/${project.id}`}>
                      <h3 className="text-sm font-bold mb-1.5 leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-full">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-400 text-[10px] rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1 mb-3 py-2 border-y border-gray-100 dark:border-gray-700">
                      {Object.entries(project.metrics).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{v}</div>
                          <div className="text-[9px] text-gray-400">{k}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <CodeBracketIcon className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                      <Link
                        to={`/projects/${project.id}`}
                        className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium transition-colors"
                      >
                        Details
                        <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {featuredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-blue-600'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
            <ServerIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
