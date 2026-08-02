import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | DevOps Engineer</title>
        <meta name="description" content="Get in touch with me via social media or send a message" />
      </Helmet>

      <div className="min-h-screen py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                contact<span className="text-blue-500">.</span>
              </h1>
              <div className="w-16 h-1 bg-blue-500 rounded" />
            </div>

            <ContactForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}
