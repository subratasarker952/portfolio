'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import { projectsApi } from '@/services/api'
import type { Project } from '@/types'
import { ExternalLink, Github, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const categories = ['All', 'Full-Stack', 'AI/ML', 'Mobile', 'SaaS', 'Frontend', 'Backend']

// Default projects
const defaultProjects: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, payment processing via Stripe, and order tracking.',
    thumbnail: '',
    images: [],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'Full-Stack',
    featured: true,
    createdAt: '2024-01-15',
    updatedAt: '',
    longDescription: "",
    image: "",
    technologies: [],
    status: "completed"
  },
  {
    _id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    description: 'A collaborative task management application with real-time updates, team workspaces, and Kanban boards.',
    thumbnail: '',
    images: [],
    techStack: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'Full-Stack',
    featured: true,
    createdAt: '2024-02-20',
    updatedAt: '',
    longDescription: "",
    image: "",
    technologies: [],
    status: "completed"
  },
  {
    _id: '3',
    title: 'AI Chat Assistant',
    slug: 'ai-chat-assistant',
    description: 'An intelligent chat assistant powered by OpenAI GPT-4, featuring context-aware conversations and custom training.',
    thumbnail: '',
    images: [],
    techStack: ['Next.js', 'OpenAI', 'Vercel AI SDK', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'AI/ML',
    featured: true,
    createdAt: '2024-03-10',
    updatedAt: '',
    longDescription: "",
    image: "",
    technologies: [],
    status: "completed"
  },
]

export default function ProjectsPage() {
  const { data } = useSWR('projects', () => projectsApi.getAll())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const projects = data?.data?.length ? data.data : defaultProjects

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back Home
              </Link>
            </Button>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 ">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore my complete portfolio of projects spanning various technologies and industries.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 mb-8 items-center"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group h-full">
      <div className="bg-card border border-border rounded-xl overflow-hidden h-full flex flex-col hover:border-primary/50 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-video bg-linear-to-br from-secondary to-muted overflow-hidden">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
              <span className="text-4xl font-bold text-primary/20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {project.featured && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Featured
            </div>
          )}

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="secondary" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <span className="text-xs font-medium text-primary mb-2">{project.category}</span>
          <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
