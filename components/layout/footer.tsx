'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUpRight,
  Globe,
} from 'lucide-react'
import useSWR from 'swr'
import { aboutApi } from '@/services/api'

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  const { data } = useSWR('about', () => aboutApi.get())

  const about = data?.data

  const socialLinks = [
    {
      href: about?.socialLinks?.github || '#',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: about?.socialLinks?.linkedin || '#',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: `mailto:${about?.email}`,
      icon: Mail,
      label: 'Email',
    },
    {
      href: about?.socialLinks?.website || '#',
      icon: Globe,
      label: 'Website',
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-bold text-primary-foreground">
                  S
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {about?.name || "Subrata Sarker"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {about?.title || "MERN Stack Developer"}
                </p>
              </div>
            </Link>

            <p className="max-w-sm leading-relaxed text-muted-foreground">
              {about?.footerDescription || "Passionate full-stack developer focused on building scalable, responsive, and modern web applications using MERN technologies."}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Let's Connect
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {about?.footerConnectText || "I am available for freelance work, collaborations, and full-time opportunities."}
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
        >
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            by {about?.name || "Subrata Sarker"}
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}