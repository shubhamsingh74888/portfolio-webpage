import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projectService } from '../services/project.service'

import {
  FunnelIcon,
  Squares2X2Icon,
  Bars3Icon,
  MagnifyingGlassIcon,
  FolderIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const categories = ['All', 'DevOps', 'Cloud', 'CI/CD', 'Monitoring', 'Automation', 'Security']

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // TEMPORARY DUMMY DATA SO YOU CAN SEE THE PAGE INSTANTLY
    const dummyData = [
      {
        _id: '1',
        title: 'Kubernetes CI/CD with ArgoCD & Helm',
        description: 'GitOps pipeline for microservices with automatic rollbacks',
        category: 'CI/CD',
        technologies: [{ name: 'Kubernetes' }, { name: 'ArgoCD' }, { name: 'Helm' }],
        status: 'completed'
      },
      {
        _id: '2',
        title: 'Multi-Region AWS Infrastructure',
        description: 'Terraform modules for production-grade cloud setup',
        category: 'Cloud',
        technologies: [{ name: 'Terraform' }, { name: 'AWS' }, { name: 'GitHub Actions' }],
        status: 'completed'
      },
      {
        _id: '3',
        title: 'Observability Stack',
        description: 'Prometheus + Grafana + Loki + Alertmanager',
        category: 'Monitoring',
        technologies: [{ name: 'Prometheus' }, { name: 'Grafana' }, { name: 'Loki' }],
        status: 'in-progress'
      }
    ]

    setProjects(dummyData)
    setFilteredProjects(dummyData)
    setLoading(false)
  }, [])

  // Real fetch (uncomment when backend is fixed)
  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       setLoading(true)
  //       const res = await projectService.getAllProjects()
  //       setProjects(res.data || [])
  //     } catch (err) {
  //       console.error(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   load()
  // }, [])

  const filtered = projects.filter(project => {
    if (selectedCategory !== 'All' && project.category !== selectedCategory) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const inTitle = project.title?.toLowerCase().includes(term)
      const inDesc = project.description?.toLowerCase().includes(term)
      const inTech = project.technologies?.some(t => t.name?.toLowerCase().includes(term))
      if (!inTitle && !inDesc && !inTech) return false
    }
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Projects | My DevOps Portfolio</title>
      </Helmet>

      <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            My Projects
          </h1>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Categories + View Toggle */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Projects */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FunnelIcon className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl text-gray-600 dark:text-gray-400">No projects found</p>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-8'
            }>
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}