import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
 import { FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { 
  CodeBracketIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/shubhamsingh74888', 
      icon: CodeBracketIcon 
    },

// inside your social links array
    {
     name: 'LinkedIn',
     url: 'https://www.linkedin.com/in/shubham-singh-aa858b35a',   // ← add https://
     icon: FaLinkedin    // or FaLinkedinIn if you prefer the thinner version
    },
   { 
      name: 'Email', 
      url: 'shubhamsingh74888@gmail.com', 
      icon: EnvelopeIcon 
    },
  ]

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Portfolio</h3>
            <p className="text-gray-400">
              DevOps Engineer specializing in cloud infrastructure and automation.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    title={social.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
