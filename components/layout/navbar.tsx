'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore, useUIStore } from '@/store'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Menu,
  X,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  LogIn,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'
import { aboutApi } from '@/services/api'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore()

  const {
    mobileMenuOpen,
    toggleMobileMenu,
    setMobileMenuOpen,
  } = useUIStore()

  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { data } = useSWR('about', () => aboutApi.get())

  const about = data?.data

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  if (!mounted) return null

  const socialLinks = [
    {
      href: about?.socialLinks?.github,
      icon: Github,
      label: 'GitHub',
    },
    {
      href: about?.socialLinks?.linkedin,
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: `mailto:${about?.email}`,
      icon: Mail,
      label: 'Email',
    },
  ]

  return (
    <>
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
            ? 'border-b border-border/50 bg-background/70 backdrop-blur-2xl shadow-lg shadow-black/5'
            : 'bg-transparent'
          }`}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-bold">
                  {about?.name?.charAt(0) || 'S'}
                </span>
              </div>

              <div className="hidden sm:block">
                <h2 className="text-lg font-bold leading-none text-foreground">
                  {about?.name || 'Subrata Sarker'}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {about?.title || 'Full-Stack Web Developer'}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Social */}
            <div className="hidden items-center gap-2 md:flex">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative rounded-xl"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Hire Me */}
            <Button
              asChild
              className="hidden rounded-xl shadow-lg shadow-primary/20 md:inline-flex"
            >
              <Link href="/admin">
                Login
                <LogIn className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl lg:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

            {/* Content */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex h-full flex-col items-center justify-center px-6"
            >
              {/* Nav Links */}
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className="text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex items-center gap-4"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Admin */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Button asChild size="lg" className="rounded-2xl px-8">
                  <Link href="/admin" onClick={handleNavClick}>
                    Admin Dashboard
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}