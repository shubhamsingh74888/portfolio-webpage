import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  ServerIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const featuredProjects = [
  {
    id: 1,
    title: 'Multi-Cloud E-commerce Platform',
    description: 'Scalable e-commerce platform deployed across AWS, Azure, and GCP with auto-scaling and CI/CD pipeline',
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
    category: 'Cloud Migration',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    liveUrl: '#',
    githubUrl: '#',
    metrics: {
      deploymentTime: '30% faster',
      cost: '40% reduced',
      availability: '99.99%'
    }
  },
  {
    id: 2,
    title: 'Microservices Banking System',
    description: 'Modern banking system with 20+ microservices, service mesh, and GitOps deployment',
    technologies: ['Docker', 'Kubernetes', 'Istio', 'ArgoCD', 'Grafana'],
    category: 'Microservices',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800',
    liveUrl: '#',
    githubUrl: '#',
    metrics: {
      deploymentFrequency: '50/day',
      leadTime: '2 hours',
      mttr: '5 minutes'
    }
  },
  {
    id: 3,
    title: 'DevSecOps Pipeline for FinTech',
    description: 'Complete DevSecOps implementation with SAST/DAST, secret scanning, and compliance automation',
    technologies: ['GitLab CI', 'SonarQube', 'Trivy', 'Aqua Security', 'OWASP'],
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=800',
    liveUrl: '#',
    githubUrl: '#',
    metrics: {
      vulnerabilities: '90% reduced',
      compliance: '100% automated',
      scanTime: '5 minutes'
    }
  }
]

export default function FeaturedProjects() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Real-world DevOps implementations with measurable results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="View Code"
                  >
                    <CodeBracketIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    title="Live Demo"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </a>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  Case Study
                  <EyeIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Link
          to="/projects"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          View All Projects
          <ServerIcon className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}