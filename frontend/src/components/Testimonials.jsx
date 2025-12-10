import { motion } from 'framer-motion'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priyanshu Singh',
      role: 'Full-Stack Developer',
      image: 'https://i.pravatar.cc/150?img=1',
      text: 'Shubham is a DevOps wizard! He automated our entire CI/CD pipeline in just 3 days. Highly recommend!',
    },
    {
      name: 'Rahul Kumar',
      role: 'Tech Lead at FinTech Co.',
      image: 'https://i.pravatar.cc/150?img=12',
      text: 'Best Kubernetes + Terraform setup I’ve seen. Zero downtime migration — pure genius!',
    },
    {
      name: 'Anjali Sharma',
      role: 'Startup Founder',
      image: 'https://i.pravatar.cc/150?img=32',
      text: 'Saved us ₹15+ lakhs in cloud costs. His optimization skills are unmatched!',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Trusted by developers, startups, and tech leads
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

              {/* Quote Icon */}
              <div className="text-cyan-500 dark:text-cyan-400 text-5xl font-bold mb-4 opacity-20">“</div>

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-cyan-500/30 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* 5 Stars */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}