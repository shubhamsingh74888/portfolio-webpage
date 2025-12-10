import { useState } from 'react'
import toast from 'react-hot-toast'
import { contactService } from '../services/contact.service'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'consultation',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await contactService.submitContact(formData)
      toast.success(response.message || 'Message sent successfully!')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        purpose: 'consultation',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Purpose of Contact *
        </label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          className="input-field"
        >
          <option value="consultation">Consultation</option>
          <option value="project">Project Work</option>
          <option value="freelance">Freelance</option>
          <option value="collaboration">Collaboration</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Type
          </label>
          <input
            type="text"
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="input-field"
            placeholder="CI/CD Pipeline, Cloud Migration, etc."
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Budget</option>
            <option value="< $5k">Less than $5,000</option>
            <option value="$5k - $15k">$5,000 - $15,000</option>
            <option value="$15k - $50k">$15,000 - $50,000</option>
            <option value="$50k - $100k">$50,000 - $100,000</option>
            <option value="> $100k">More than $100,000</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Timeline</option>
          <option value="ASAP">ASAP</option>
          <option value="1-2 weeks">1-2 Weeks</option>
          <option value="1 month">1 Month</option>
          <option value="1-3 months">1-3 Months</option>
          <option value="3+ months">3+ Months</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="input-field"
          placeholder="Tell me about your project requirements, challenges, and goals..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full"
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Message...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}