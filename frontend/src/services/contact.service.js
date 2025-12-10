import api from '@/api'

export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    const response = await api.post('/contact', contactData)
    return response.data
  },

  // Get all contacts (admin)
  getAllContacts: async (params = {}) => {
    const response = await api.get('/admin/contacts', { params })
    return response.data
  },

  // Get single contact (admin)
  getContact: async (id) => {
    const response = await api.get(`/admin/contacts/${id}`)
    return response.data
  },

  // Delete contact (admin)
  deleteContact: async (id) => {
    const response = await api.delete(`/admin/contacts/${id}`)
    return response.data
  },

  // Mark contact as read (admin)
  markAsRead: async (id) => {
    const response = await api.patch(`/admin/contacts/${id}/read`)
    return response.data
  }
}
