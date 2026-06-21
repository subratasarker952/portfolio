export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  images: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
  longDescription: string
  image: string
  technologies: string[]
  status: string
}

export interface Skill {
  _id: string
  name: string
  icon: string
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other'
  proficiency: number
  createdAt: string
  updatedAt: string
}

export interface Experience {
  _id: string
  location: string
  title: string
  company: string
  role: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  technologies: string[]
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  image: string
  content: string
  role: string
  name: string
  _id: string
  clientName: string
  review: string
  company: string
  avatar?: string
  rating: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  subject: string
  _id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface About {
  _id: string
  name: string
  email: string
  phone: string
  location: string
  highlights: string[]
  title: string
  subtitle: string
  description: string
  avatar: string
  footerDescription: string
  footerConnectText: string
  resume: string
  socialLinks: {
    website: string
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  avatar: string
  resume: string
  socialLinks: any
  highlights: string[]
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Type aliases for compatibility with sample data
export type IProject = Project & {
  shortDescription?: string
  technologies?: string[]
  order?: number
  status?: 'draft' | 'published'
}

export type ISkill = Skill & {
  order?: number
}

export type IExperience = Experience & {
  achievements?: string[]
  order?: number
  position?: string
}

export type ITestimonial = Testimonial & {
  name?: string
  position?: string
  content?: string
  featured?: boolean
  order?: number
}

export type IAbout = About & {
  name?: string
  tagline?: string
  bio?: string
  email?: string
  phone?: string
  location?: string
}

export type IMessage = Message
