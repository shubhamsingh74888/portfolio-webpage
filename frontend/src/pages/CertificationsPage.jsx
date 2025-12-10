import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function CertificationsPage() {
  return (
    <>
      <Helmet>
        <title>Certifications | DevOps Engineer</title>
        <meta name="description" content="My professional certifications" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-16">Certifications</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional certifications and qualifications.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
