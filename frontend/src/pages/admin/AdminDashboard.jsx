import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Welcome to the admin dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
