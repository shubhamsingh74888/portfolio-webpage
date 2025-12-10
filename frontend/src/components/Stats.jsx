import { motion } from 'framer-motion'

export default function Stats() {
  const stats = [
    { label: 'Projects Completed', value: '50+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Certifications', value: '10+' },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
