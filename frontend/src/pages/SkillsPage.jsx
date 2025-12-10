import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import SkillsOverview from '../components/SkillsOverview'

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills | DevOps Engineer</title>
        <meta name="description" content="My technical skills and expertise" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-16">Skills & Expertise</h1>
            <SkillsOverview />
          </motion.div>
        </div>
      </div>
    </>
  )
}
