import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services | DevOps Engineer</title>
        <meta name="description" content="Services I offer" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-16">Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional DevOps and cloud services.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
