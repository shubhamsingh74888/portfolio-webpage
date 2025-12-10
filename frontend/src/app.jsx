import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout'
import HomePage from './pages/homepage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import CertificationsPage from './pages/CertificationsPage'
import ExperiencePage from './pages/ExperiencePage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: { background: '#1f2937', color: '#fff' },
                success: { duration: 3000, iconTheme: { primary: '#10b981', secondary: '#fff' } },
                error: { duration: 4000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
              }}
            />

            <Routes>
            
              {/* Main pages with Layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App