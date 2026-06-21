'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { experienceApi } from '@/services/api'
import type { Experience } from '@/types'
import { Briefcase, Calendar } from 'lucide-react'

// Default experiences for when MongoDB is not connected
const defaultExperiences: Experience[] = []


function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function ExperienceSection() {
  const { data } = useSWR('experience', () => experienceApi.getAll())

  const experiences = data?.data?.length ? data.data : defaultExperiences

  return (<>
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional experience and the impactful work I have done.
          </p>
        </motion.div>

        {/* Timeline */}
        {experiences.length > 0 ? <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-4 border-background shadow-lg z-10" />

                {/* Date (Mobile: inline, Desktop: separate column) */}
                <div className={`hidden md:flex md:w-1/2 items-start ${index % 2 === 0 ? 'justify-start pl-12' : 'justify-end pr-12'
                  }`}>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Mobile Date */}
                    <div className="flex items-center gap-2 text-muted-foreground mb-3 md:hidden">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                      </span>
                    </div>

                    {/* Company & Role */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-primary">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      {exp.current && (
                        <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div> : <div className="text-center py-10 text-muted-foreground">
          No experience found. Showing projects instead.
        </div>}
      </div>
    </section>
  </>)
}
