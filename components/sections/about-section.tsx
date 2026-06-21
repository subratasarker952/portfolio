'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { aboutApi } from '@/services/api'
import { User, MapPin, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AboutSection() {
  const { data } = useSWR('about', () => aboutApi.get())

  const about = data?.data || {
    avatar: 'https://subratasarker.vercel.app/ProfilePicturePhoto.jpg',
    resume: "https://drive.google.com/file/d/1_EpWP2313rOU-Er3yTodThs37oX3FCiY",
    title: 'Full-Stack Web Developer',
    subtitle: 'Building Scalable MERN Applications',
    description: "I'm a passionate Full-Stack Web Developer with over 2 years of hands on projects experience in building modern, scalable web applications. My expertise lies in the MERN stack (MongoDB, Express.js, React, Node.js), and I'm constantly exploring new technologies to deliver cutting-edge solutions.I believe in writing clean, maintainable code and following best practices. My approach combines technical excellence with a deep understanding of user needs, resulting in applications that are both powerful and intuitive.When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or mentoring aspiring developers.",
  }

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Avatar Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Main Avatar Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 to-accent/20 p-1">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  {about.avatar ? (
                    <img
                      src={about.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-secondary to-muted flex items-center justify-center rounded-xl">
                      <User className="w-32 h-32 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-24 h-24 rounded-xl bg-linear-to-br from-primary to-primary/50 opacity-80"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl bg-linear-to-br from-accent to-accent/50 opacity-80"
              />

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-card border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">3+</div>
                    <div className="text-sm text-muted-foreground">Years Exp.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Section Header */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">About Me</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {about.title}
              </h2>
              <p className="text-lg text-primary font-medium">
                {about.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {about.description}
                </p>
            </div>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Remote / Worldwide</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-foreground">Available for hire</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild>
                <a href="#contact">
                  Let&apos;s Talk
                </a>
              </Button>
              {about.resume && (
                <Button variant="outline" asChild>
                  <a href={about.resume} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
