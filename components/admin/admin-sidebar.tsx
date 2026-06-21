'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore, useUIStore } from '@/store'
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  MessageSquare,
  Star,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/dashboard/about', icon: User, label: 'About' },
  { href: '/admin/dashboard/skills', icon: Code2, label: 'Skills' },
  { href: '/admin/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { href: '/admin/dashboard/experience', icon: Briefcase, label: 'Experience' },
  { href: '/admin/dashboard/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/dashboard/messages', icon: MessageSquare, label: 'Messages' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {sidebarOpen && (
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">D</span>
                </div>
                <span className="font-semibold text-foreground">Admin</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden lg:flex"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <link.icon className="w-5 h-5 shrink-0" />
                      {sidebarOpen && <span className="font-medium">{link.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors mb-1"
            >
              <ChevronLeft className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">View Site</span>}
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export function AdminHeader() {
  const { toggleSidebar, sidebarOpen } = useUIStore()

  return (
    <header className={`sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300 `}>
      <div className="h-16 flex items-center justify-between px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
        </div>
      </div>
    </header>
  )
}
