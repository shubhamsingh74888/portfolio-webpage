import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Me | DevOps Engineer</title>
        <meta name="description" content="Learn about my background and expertise in DevOps" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">About Me</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              I am a passionate DevOps engineer with extensive experience in cloud technologies and infrastructure automation.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
