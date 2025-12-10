import api from './api'

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify')
      return response.data
    } catch (error) {
      return { valid: false }
    }
  },

  // Register
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken')
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      oldPassword,
      newPassword
    })
    return response.data
  },

  // Reset password
  resetPassword: async (email) => {
    const response = await api.post('/auth/reset-password', { email })
    return response.data
  }
}
