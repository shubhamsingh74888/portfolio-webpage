import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

const experiences = [
  {
    role: 'Technical Intern — AI/ML & Automation',
    company: 'CSIR-IIP, Govt. of India',
    location: 'Dehradun, India (Remote)',
    period: 'Dec 2025 — Mar 2026',
    type: 'Internship',
    color: 'from-blue-500 to-cyan-500',
    logo: '/csir-certificate.jpg',
    description:
      'Worked on an end-to-end Machine Learning pipeline for predicting battery Remaining Useful Life (RUL) using multi-sensor degradation data from the NASA PCoE dataset.',
    highlights: [
      'Built and evaluated 4 ML models (Random Forest, Gradient Boosting, XGBoost, SVR) using leave-one-battery-out cross-validation',
      'Automated ETL data pipelines using Python and Bash scripting, reducing manual data handling effort by 40%',
      'Engineered features from voltage, current, and temperature battery cycling curves',
      'Maintained version-controlled environments and reproducible experiment pipelines using Git',
      'Documented model comparison results and delivered findings to CSIR-IIP research team',
    ],
    tech: ['Python', 'XGBoost', 'scikit-learn', 'Pandas', 'Bash', 'Git', 'Jupyter', 'NumPy'],
    impact: '40% reduction in manual effort',
  },
]

const devopsProjects = [
  {
    title: 'wanderlust-infra',
    role: 'DevOps Engineer (Self-directed)',
    period: '2025',
    highlights: [
      'Provisioned 41 AWS resources via modular Terraform with S3/DynamoDB remote state locking',
      'Diagnosed and resolved Terraform destroy failures caused by orphaned ALBs',
      'Configured CloudWatch alarms → SNS for sub-60-second incident detection',
    ],
    tech: ['Terraform', 'AWS', 'CloudWatch', 'SNS', 'Jenkins'],
  },
  {
    title: 'Wanderlust-Mega-Project',
    role: 'DevOps Engineer (Self-directed)',
    period: '2025',
    highlights: [
      'Resolved CI/CD race condition between GitOps push and ArgoCD sync',
      'Fixed ArgoCD OutOfSync failures from immutable StorageClass fields',
      'Integrated SonarQube quality gates and Trivy container scanning into Jenkins pipelines',
    ],
    tech: ['Kubernetes', 'ArgoCD', 'Jenkins', 'SonarQube', 'Trivy', 'Helm'],
  },
]

export default function ExperiencePage() {
  return (
    <>
      <Helmet>
        <title>Experience | Shubham Singh — DevOps Engineer</title>
        <meta name="description" content="Professional experience and project work in DevOps and Cloud engineering" />
      </Helmet>

      <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Experience
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
              Hands-on internship experience plus self-directed DevOps project work
              focused on AWS, Kubernetes, and CI/CD automation.
            </p>
          </motion.div>

          {/* ── Formal experience ── */}
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Internship
            </h2>

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 mb-4"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML = '<span class="text-white text-lg">🏛️</span>'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-full flex-shrink-0">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Key highlights */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5">
                    Key Contributions
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact badge */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Impact:</span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-0.5 rounded-full">
                    {exp.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Project experience ── */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              Project Experience
            </h2>
            <div className="space-y-4">
              {devopsProjects.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {proj.role} · {proj.period}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      Self-directed
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {proj.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
