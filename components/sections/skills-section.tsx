'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { skillsApi } from '@/services/api'
import type { Skill } from '@/types'
import { 
  Code2, 
  Server, 
  Database, 
  Wrench,
  Layers
} from 'lucide-react'

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  Other: Layers,
}

const categoryColors: Record<string, string> = {
  Frontend: 'from-blue-500 to-cyan-500',
  Backend: 'from-green-500 to-emerald-500',
  Database: 'from-orange-500 to-amber-500',
  Tools: 'from-purple-500 to-pink-500',
  Other: 'from-gray-500 to-slate-500',
}

// Default skills for when MongoDB is not connected
const defaultSkills: Skill[] = [
  { _id: '1', name: 'React', icon: 'react', category: 'Frontend', proficiency: 95, createdAt: '', updatedAt: '' },
  { _id: '2', name: 'Next.js', icon: 'nextjs', category: 'Frontend', proficiency: 90, createdAt: '', updatedAt: '' },
  { _id: '3', name: 'TypeScript', icon: 'typescript', category: 'Frontend', proficiency: 90, createdAt: '', updatedAt: '' },
  { _id: '4', name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend', proficiency: 95, createdAt: '', updatedAt: '' },
  { _id: '5', name: 'Node.js', icon: 'nodejs', category: 'Backend', proficiency: 90, createdAt: '', updatedAt: '' },
  { _id: '6', name: 'Express.js', icon: 'express', category: 'Backend', proficiency: 85, createdAt: '', updatedAt: '' },
  { _id: '7', name: 'MongoDB', icon: 'mongodb', category: 'Database', proficiency: 88, createdAt: '', updatedAt: '' },
  { _id: '8', name: 'PostgreSQL', icon: 'postgresql', category: 'Database', proficiency: 80, createdAt: '', updatedAt: '' },
  { _id: '9', name: 'Git', icon: 'git', category: 'Tools', proficiency: 90, createdAt: '', updatedAt: '' },
  { _id: '10', name: 'Docker', icon: 'docker', category: 'Tools', proficiency: 75, createdAt: '', updatedAt: '' },
  { _id: '11', name: 'AWS', icon: 'aws', category: 'Tools', proficiency: 70, createdAt: '', updatedAt: '' },
  { _id: '12', name: 'Figma', icon: 'figma', category: 'Tools', proficiency: 80, createdAt: '', updatedAt: '' },
]

export function SkillsSection() {
  const { data } = useSWR('skills', () => skillsApi.getAll())
  
  const skills = data?.data?.length ? data.data : defaultSkills

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categories = Object.keys(groupedSkills)

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden bg-secondary/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">My Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I specialize in modern web technologies and continuously expand my skill set to deliver cutting-edge solutions.
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category] || Layers
            const colorClass = categoryColors[category] || categoryColors.Other

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category}</h3>
                </div>

                {/* Skills in Category */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <div className="relative bg-card border border-border rounded-xl p-4 h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        {/* Proficiency Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-b-xl overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className={`h-full bg-gradient-to-r ${colorClass}`}
                          />
                        </div>

                        <div className="text-center space-y-2">
                          {/* Skill Name */}
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </h4>
                          {/* Proficiency */}
                          <span className="text-xs text-muted-foreground">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
