'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { projectsApi } from '@/services/api'
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const { data, isLoading } = useSWR(
    slug ? `project-${slug}` : null,
    () => projectsApi.getBySlug(slug)
  )

  const project = data?.data

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="aspect-video bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </motion.header>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <span className="text-6xl font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">About This Project</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">Screenshots</h2>
              <div className="grid gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
