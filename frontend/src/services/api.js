import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT token to every request automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authService = {
  register: (email, password) =>
    api.post('/api/auth/register', { email, password }),

  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getUser: () => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  },

  saveSession: (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify({ email: data.email, role: data.role }))
  },

  isLoggedIn: () => !!localStorage.getItem('token')
}

export default api
