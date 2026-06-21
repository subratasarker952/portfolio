import axios from 'axios'
import type { Project, Skill, Experience, Testimonial, Message, About, ApiResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      const { state } = JSON.parse(authStorage)
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`
      }
    }
  }
  return config
})

// Projects API
export const projectsApi = {
  getAll: async (params?: { category?: string; featured?: boolean; search?: string }) => {
    const { data } = await api.get<ApiResponse<Project[]>>('/projects', { params })
    return data
  },
  getBySlug: async (slug: string) => {
    const { data } = await api.get<ApiResponse<Project>>(`/projects/${slug}`)
    return data
  },
  create: async (project: Partial<Project>) => {
    const { data } = await api.post<ApiResponse<Project>>('/projects', project)
    return data
  },
  update: async (id: string, project: Partial<Project>) => {
    const { data } = await api.put<ApiResponse<Project>>(`/projects/${id}`, project)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/projects/${id}`)
    return data
  },
}

// Skills API
export const skillsApi = {
  getAll: async (category?: string) => {
    const { data } = await api.get<ApiResponse<Skill[]>>('/skills', { params: { category } })
    return data
  },
  create: async (skill: Partial<Skill>) => {
    const { data } = await api.post<ApiResponse<Skill>>('/skills', skill)
    return data
  },
  update: async (id: string, skill: Partial<Skill>) => {
    const { data } = await api.put<ApiResponse<Skill>>(`/skills/${id}`, skill)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/skills/${id}`)
    return data
  },
}

// Experience API
export const experienceApi = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Experience[]>>('/experience')
    return data
  },
  create: async (experience: Partial<Experience>) => {
    const { data } = await api.post<ApiResponse<Experience>>('/experience', experience)
    return data
  },
  update: async (id: string, experience: Partial<Experience>) => {
    const { data } = await api.put<ApiResponse<Experience>>(`/experience/${id}`, experience)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/experience/${id}`)
    return data
  },
}

// Testimonials API
export const testimonialsApi = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Testimonial[]>>('/testimonials')
    return data
  },
  create: async (testimonial: Partial<Testimonial>) => {
    const { data } = await api.post<ApiResponse<Testimonial>>('/testimonials', testimonial)
    return data
  },
  update: async (id: string, testimonial: Partial<Testimonial>) => {
    const { data } = await api.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, testimonial)
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/testimonials/${id}`)
    return data
  },
}

// Messages API
export const messagesApi = {
  getAll: async () => {
    const { data } = await api.get<ApiResponse<Message[]>>('/messages')
    return data
  },
  create: async (message: { name: string; email: string; message: string }) => {
    const { data } = await api.post<ApiResponse<Message>>('/messages', message)
    return data
  },
  markAsRead: async (id: string) => {
    const { data } = await api.put<ApiResponse<Message>>(`/messages/${id}`, { read: true })
    return data
  },
  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/messages/${id}`)
    return data
  },
}

// About API
export const aboutApi = {
  get: async () => {
    const { data } = await api.get<ApiResponse<About>>('/about')
    return data
  },
  update: async (about: Partial<About>) => {
    const { data } = await api.put<ApiResponse<About>>('/about', about)
    return data
  },
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ token: string }>>('/auth/login', { email, password })
    return data
  },
  register: async (email: string, password: string, name: string) => {
    const { data } = await api.post<ApiResponse<{ token: string }>>('/auth/register', { email, password, name })
    return data
  },
  verify: async () => {
    const { data } = await api.get<ApiResponse<{ valid: boolean }>>('/auth/verify')
    return data
  },
}

export default api
