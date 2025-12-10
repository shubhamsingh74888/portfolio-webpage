import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | DevOps Engineer</title>
        <meta name="description" content="Get in touch with me" />
      </Helmet>
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-16">Contact Me</h1>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}
