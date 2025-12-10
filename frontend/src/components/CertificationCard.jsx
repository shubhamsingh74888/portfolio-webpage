import { motion } from 'framer-motion'
import { 
  CalendarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ExternalLinkIcon
} from '@heroicons/react/24/outline'

export default function CertificationCard({ certification, index }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      aws: 'from-orange-500 to-yellow-500',
      azure: 'from-blue-500 to-cyan-500',
      gcp: 'from-green-500 to-emerald-500',
      kubernetes: 'from-blue-600 to-indigo-600',
      terraform: 'from-purple-500 to-pink-500',
      security: 'from-red-500 to-orange-500',
      devops: 'from-gray-600 to-gray-800'
    };
    return colors[category] || 'from-blue-500 to-indigo-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start mb-4">
        <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(certification.category)} rounded-xl flex items-center justify-center mr-4`}>
          {certification.image?.url ? (
            <img 
              src={certification.image.url} 
              alt={certification.issuer}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {certification.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {certification.issuer}
          </p>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
        {certification.description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>Issued: {formatDate(certification.issueDate)}</span>
          {certification.expirationDate && (
            <span className="ml-4">Expires: {formatDate(certification.expirationDate)}</span>
          )}
        </div>
        
        {certification.credentialId && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            <span>Credential ID: {certification.credentialId}</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {certification.skills?.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      
      {certification.credentialUrl && (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
        >
          Verify Certification
          <ExternalLinkIcon className="w-4 h-4 ml-1" />
        </a>
      )}
    </motion.div>
  )
}