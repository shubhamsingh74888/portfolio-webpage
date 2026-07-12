import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, CodeBracketIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

const projects = [
  {
    id: '1',
    title: 'Wanderlust DevSecOps Pipeline',
    category: 'DevSecOps',
    image: '/thumbnails/pipeline1.png',
    fallback: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200',
    githubUrl: 'https://github.com/shubhamsingh74888/Wanderlust-Mega-Project',
    description: 'A production-grade 10-stage Jenkins CI pipeline for a MERN stack travel app with full DevSecOps — SAST, dependency scanning, container security, and GitOps delivery on AWS EKS.',
    technologies: ['Jenkins', 'SonarQube', 'Trivy', 'OWASP', 'Docker', 'ArgoCD', 'AWS EKS', 'Groovy Shared Library'],
    highlights: [
      'Stage 1 — Git Checkout from GitHub SCM',
      'Stage 2 — SonarQube SAST + Quality Gate enforcement',
      'Stage 3 — NPM dependency install',
      'Stage 4 — OWASP Dependency Check (CVE scan)',
      'Stage 5 — Trivy filesystem scan',
      'Stage 6 — Docker image build and push to Docker Hub',
      'Stage 7 — Trivy Docker image scan',
      'Stage 8 — ArgoCD GitOps sync to EKS cluster',
      'Jenkins Shared Library (Groovy) for reusable modular stages',
      'AWS credential rotation and secure secret handling via Jenkins credentials',
    ],
    metrics: [
      { label: 'Pipeline Stages', value: '10' },
      { label: 'Security Scans', value: '3' },
      { label: 'Deploy Target', value: 'EKS' },
      { label: 'Delivery', value: 'GitOps' },
    ],
    problem: 'Needed a repeatable, secure CI/CD pipeline for a MERN app that enforced code quality, dependency safety, and container security before every production deployment.',
    solution: 'Built a 10-stage Jenkins pipeline using a Shared Library for modularity. Integrated SonarQube for SAST, OWASP for CVE scanning, Trivy for FS and image scans, and ArgoCD for GitOps EKS delivery.',
    outcome: 'Zero manual deployment steps. Every commit triggers automated security gates. Failed scans block the pipeline before any image reaches production.',
  },
  {
    id: '2',
    title: 'Wanderlust EKS Infrastructure',
    category: 'Infrastructure',
    image: '/thumbnails/pipeline2.png',
    fallback: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?auto=format&fit=crop&w=1200',
    githubUrl: 'https://github.com/shubhamsingh74888/wanderlust-infra',
    description: 'Full Terraform-managed AWS EKS cluster with Jenkins CI server, Prometheus/Grafana monitoring, ArgoCD GitOps controller, and Helm-based application delivery.',
    technologies: ['Terraform', 'AWS EKS', 'EC2', 'VPC', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD', 'Packer'],
    highlights: [
      'Modular Terraform: vpc, cicd-server, eks modules',
      'S3 + DynamoDB remote state backend with locking',
      'Packer AMI with Jenkins, Docker, kubectl, Trivy pre-installed',
      'EKS with EBS CSI driver, AWS Load Balancer Controller, IAM OIDC',
      'Prometheus + Grafana deployed via Helm for cluster metrics',
      'ArgoCD installed on EKS with ApplicationSet for multi-repo GitOps',
      'EC2/EIP import reconciliation in Jenkinsfile',
      'Pre-destroy ELB cleanup stage to prevent TF state drift',
    ],
    metrics: [
      { label: 'TF Resources', value: '41' },
      { label: 'Modules', value: '3' },
      { label: 'Region', value: 'ap-south-1' },
      { label: 'Monitoring', value: 'Prometheus' },
    ],
    problem: 'Needed reproducible AWS infrastructure that could spin up a full DevOps platform — Jenkins, EKS, monitoring, and GitOps — from a single terraform apply.',
    solution: 'Designed modular Terraform with separate vpc, cicd-server, and eks modules. Used Packer to bake a Jenkins AMI. Configured EKS add-ons via Helm. Remote state in S3 + DynamoDB.',
    outcome: '41 AWS resources created consistently. Full platform available within 15 minutes of terraform apply. State locking prevents concurrent drift.',
  },
  {
    id: '3',
    title: 'Stock Price Serverless Pipeline',
    category: 'Serverless',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200',
    githubUrl: '#',
    description: 'Event-driven serverless data pipeline — CSV uploaded to S3 triggers Lambda which parses and stores stock records in DynamoDB. Fully Terraform-managed.',
    technologies: ['AWS Lambda', 'S3', 'DynamoDB', 'Terraform', 'Python 3.11', 'EventBridge', 'IAM', 'CloudWatch'],
    highlights: [
      'S3 event notification triggers Lambda on every CSV upload',
      'Python Lambda parses stock price data and batch-writes to DynamoDB',
      'Terraform manages Lambda, S3, DynamoDB, IAM roles end-to-end',
      'CloudWatch logs and metric alarms for Lambda error monitoring',
      'IAM least-privilege execution role for Lambda',
    ],
    metrics: [
      { label: 'Trigger', value: 'S3 Event' },
      { label: 'Runtime', value: 'Python 3.11' },
      { label: 'Storage', value: 'DynamoDB' },
      { label: 'IaC', value: 'Terraform' },
    ],
    problem: 'Needed an automated, serverless pipeline to ingest stock CSVs and make data queryable — without managing any EC2 instances.',
    solution: 'Fully serverless: S3 bucket with event notifications, Python Lambda for parsing, DynamoDB as data store, all provisioned via Terraform with IAM least-privilege.',
    outcome: 'Zero infrastructure to manage. CSVs dropped into S3 are parsed and in DynamoDB within seconds. Near-zero cost with pay-per-invocation.',
  },
  {
    id: '4',
    title: 'Battery RUL Prediction',
    category: 'ML / AI',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&w=1200',
    githubUrl: '#',
    description: 'ML pipeline predicting battery Remaining Useful Life using Linear Regression, Random Forest, and XGBoost with a Flask REST API and interactive dashboard. Built during CSIR-IIP internship.',
    technologies: ['Python', 'XGBoost', 'Random Forest', 'Flask', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    highlights: [
      'Compared Linear Regression, Random Forest, and XGBoost on battery cycle data',
      'Feature engineering on discharge capacity, voltage, and cycle count',
      'XGBoost achieved ~94% accuracy on RUL prediction',
      'Flask REST API exposes /predict endpoint for battery health queries',
      'Interactive dashboard for visualizing degradation curves',
      'Presented at ICIEM-2026 international conference',
    ],
    metrics: [
      { label: 'Models', value: '3' },
      { label: 'Best Accuracy', value: '~94%' },
      { label: 'API', value: 'Flask' },
      { label: 'Conference', value: 'ICIEM-2026' },
    ],
    problem: 'Predicting when a battery will fail is critical for EV and IoT reliability. Manual inspection is slow and inaccurate.',
    solution: 'Trained three ML models on battery cycle data with feature engineering. Deployed the best model (XGBoost) behind a Flask API with a visual dashboard.',
    outcome: 'Accurate RUL predictions with ~94% accuracy. Accepted and presented at ICIEM-2026 international engineering conference.',
  },
]

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 mb-4">Project not found</p>
        <Link to="/" className="text-blue-500 hover:text-blue-400">← Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back */}
        {/* Back button - separate row, full hover color */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="group-hover:underline underline-offset-2">Back to Home</span>
          </Link>
        </div>

        {/* Badge - its own row with space below */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
            {project.category}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {project.description}
        </p>

        {/* Thumbnail */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-xl bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            onError={e => { if (project.fallback) e.target.src = project.fallback }}
            className="w-full object-cover max-h-72"
          />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {project.metrics.map(m => (
            <div key={m.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{m.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem / Solution / Outcome */}
        <div className="space-y-4 mb-10">
          {[
            { label: '🔍 Problem', text: project.problem },
            { label: '⚙️ Solution', text: project.solution },
            { label: '✅ Outcome', text: project.outcome },
          ].map(({ label, text }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Highlights</h2>
          <div className="space-y-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-100 dark:border-gray-700">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(t => (
              <span key={t} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-gray-700">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          {project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
              <CodeBracketIcon className="w-4 h-4" /> View on GitHub
            </a>
          )}
          <Link to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
