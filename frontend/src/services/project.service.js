import api from '@/api'

export const projectService = {
  // Get all projects
  getAllProjects: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get featured projects
  getFeaturedProjects: async () => {
    const response = await api.get('/projects/featured');
    return response.data;
  },

  // Get single project
  getProject: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create project (admin)
  createProject: async (projectData) => {
    const response = await api.post('/admin/projects', projectData);
    return response.data;
  },

  // Update project (admin)
  updateProject: async (id, projectData) => {
    const response = await api.put(`/admin/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project (admin)
  deleteProject: async (id) => {
    const response = await api.delete(`/admin/projects/${id}`);
    return response.data;
  },

  // Get project metrics
  getProjectMetrics: async () => {
    const response = await api.get('/projects/metrics');
    return response.data;
  }
};