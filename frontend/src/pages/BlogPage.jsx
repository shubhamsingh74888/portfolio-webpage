import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog | DevOps Engineer</title>
        <meta name="description" content="Latest blog posts and articles" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-16">Blog</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Latest articles and insights on DevOps and cloud technologies.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
