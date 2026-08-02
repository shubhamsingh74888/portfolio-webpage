import { useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"

const SOCIAL_LINKS = [
  { name: "GitHub",   icon: FaGithub,   href: "https://github.com/shubhamsingh74888",       cls: "hover:text-white hover:bg-gray-700" },
  { name: "LinkedIn", icon: FaLinkedin,  href: "https://linkedin.com/in/YOUR_LINKEDIN",      cls: "hover:text-blue-400 hover:bg-blue-950" },
  { name: "Twitter",  icon: FaTwitter,   href: "https://twitter.com/YOUR_TWITTER",           cls: "hover:text-sky-400 hover:bg-sky-950" },
  { name: "Email",    icon: FaEnvelope,  href: "mailto:shubhamsingh74888@gmail.com",         cls: "hover:text-green-400 hover:bg-green-950" }
]

export default function ContactForm() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" })
  const [status, setStatus]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = "Name is required"
    if (!form.email.trim())   e.email   = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email"
    if (!form.message.trim()) e.message = "Message is required"
    return e
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const ve = validate()
    if (Object.keys(ve).length > 0) { setErrors(ve); return }
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, phone: "", purpose: "other" })
      })
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }) }
      else         { setStatus("error") }
    } catch (_) {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  const fieldCls = (f) =>
    "w-full px-4 py-3 rounded-lg bg-gray-800 border text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 transition " +
    (errors[f] ? "border-red-500" : "border-gray-700")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Get in touch via social media or send me a message directly.
          I will get back to you within 24 hours.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.name} href={item.href}
                target={item.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={"flex items-center gap-3 p-4 rounded-xl border border-gray-700 text-gray-400 transition-all duration-200 " + item.cls}
              >
                <Icon className="text-2xl" />
                <span className="font-medium">{item.name}</span>
              </a>
            )
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <h2 className="text-2xl font-semibold text-white mb-6">Send me a message</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Name <span className="text-red-400">*</span></label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="John Doe" className={fieldCls("name")} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email <span className="text-red-400">*</span></label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" className={fieldCls("email")} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Message <span className="text-red-400">*</span></label>
            <textarea name="message" value={form.message} onChange={handleChange}
              rows={5} placeholder="Hi, I would like to discuss..."
              className={fieldCls("message") + " resize-none"} />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-3 px-6 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            {loading ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-lg bg-green-950 border border-green-700 text-green-400">
              <FaCheckCircle /><span>Your message was sent successfully. Thanks!</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-lg bg-red-950 border border-red-700 text-red-400">
              <FaExclamationCircle /><span>Something went wrong. Please try again later.</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
