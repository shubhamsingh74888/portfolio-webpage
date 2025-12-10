import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  CloudArrowUpIcon,
  CpuChipIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import FeaturedProjects from '../components/FeaturedProjects'
import SkillsOverview from '../components/SkillsOverview'
import Testimonials from '../components/Testimonials'
import Stats from '../components/Stats'

export default function HomePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <>
      <Helmet>
        <title>Shubham Singh - DevOps & Multicloud Engineer | AWS · Azure · GCP</title>
        <meta name="description" content="DevOps & Multicloud Engineer | Expert in CI/CD, Kubernetes, Terraform, Jenkins, GitOps | AWS · Azure · GCP Certified" />
      </Helmet>

      {/* HERO SECTION — FINAL & FLAWLESS */}
      <section className="relative overflow-hidden pt-20 pb-32 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-indigo-950 dark:to-blue-950">
        <div className="absolute inset-0 bg-grid-white/[0.04] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
          >
            {/* TEXT — SMALLER & PERFECTLY VISIBLE IN BOTH MODES */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-snug">
                <span className="block text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl">Hi, I'm</span>
                <span className="block text-cyan-500 dark:text-cyan-400 text-5xl sm:text-6xl md:text-7xl mt-2">
                  Shubham Singh
                </span>
                <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl mt-4 font-medium">
                  DevOps & Multicloud Engineer
                </span>
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10 mb-8">
                {['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitOps'].map((tech) => (
                  <span key={tech} className="px-5 py-2.5 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full text-gray-800 dark:text-white text-sm font-medium border border-gray-300 dark:border-white/20 hover:border-cyan-500 dark:hover:border-cyan-400 transition">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-10">
                Transforming development workflows with automated <span className="text-cyan-600 dark:text-cyan-400 font-semibold">CI/CD pipelines</span>, 
                scalable cloud infrastructure, and robust monitoring solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Start a Project <ArrowRightIcon className="ml-3 w-5 h-5" />
                </a>
                <a href="/my-resume.pdf" download className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-white/10 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/20 border-2 border-cyan-500/50 hover:border-cyan-400 backdrop-blur-sm transition-all duration-300">
                  Download CV <ArrowDownTrayIcon className="ml-3 w-5 h-5" />
                </a>
              </div>
            </div>

            {/* PHOTO — MOVED HIGHER */}
            <div className="relative -mt-8 lg:-mt-16">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-cyan-500/40 shadow-2xl">
                <img src="/photo.jpg" alt="Shubham Singh" className="w-full h-full object-cover" loading="eager" />
              </div>
              <div className="absolute -inset-4 bg-cyan-500/25 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>
          </motion.div>

          {/* STATS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '50+', label: 'Projects Deployed' },
              { num: '99.9%', label: 'Uptime Achieved' },
              { num: '10K+', label: 'Containers Managed' },
              { num: '24/7', label: 'Monitoring & Support' }
            ].map((stat) => (
              <div key={stat.label} className="bg-black/5 dark:bg-white/5 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-300 dark:border-white/20">
                <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{stat.num}</div>
                <div className="text-gray-700 dark:text-gray-300 mt-2 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">DevOps & Cloud Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">End-to-end solutions for modern infrastructure</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><FeaturedProjects /></div></section>
      <section className="py-20 bg-gray-50 dark:bg-gray-900"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><SkillsOverview /></div></section>
      <section className="py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Stats /></div></section>
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><Testimonials /></div>
      </section>
    </>
  )
}

const services = [
  { title: 'CI/CD Pipeline Setup', description: 'Automated pipelines using Jenkins, GitHub Actions, GitLab CI, ArgoCD', icon: CloudArrowUpIcon },
  { title: 'Container Orchestration', description: 'Kubernetes cluster setup, scaling, and GitOps workflows', icon: ServerStackIcon },
  { title: 'Infrastructure as Code', description: 'Terraform, Pulumi, CloudFormation for reproducible infrastructure', icon: CpuChipIcon },
  { title: 'DevSecOps Implementation', description: 'Security scanning, policy as code, compliance in every pipeline', icon: ShieldCheckIcon },
]