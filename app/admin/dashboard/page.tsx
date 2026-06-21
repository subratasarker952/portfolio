'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { projectsApi, skillsApi, experienceApi, testimonialsApi, messagesApi } from '@/services/api'
import { AdminSidebar, AdminHeader } from '@/components/admin/admin-sidebar'
import { useUIStore } from '@/store'
import { FolderKanban, Code2, Briefcase, Star, MessageSquare, TrendingUp, Eye, Users } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Projects', icon: FolderKanban, href: '/admin/dashboard/projects', color: 'from-blue-500 to-cyan-500' },
  { label: 'Skills', icon: Code2, href: '/admin/dashboard/skills', color: 'from-green-500 to-emerald-500' },
  { label: 'Experience', icon: Briefcase, href: '/admin/dashboard/experience', color: 'from-orange-500 to-amber-500' },
  { label: 'Testimonials', icon: Star, href: '/admin/dashboard/testimonials', color: 'from-purple-500 to-pink-500' },
  // { label: 'Messages', icon: MessageSquare, href: '/admin/dashboard/messages', color: 'from-red-500 to-rose-500' },
]

export default function DashboardPage() {
  const { sidebarOpen } = useUIStore();

  const { data: projectsData } = useSWR('admin-projects', () => projectsApi.getAll())
  const { data: skillsData } = useSWR('admin-skills', () => skillsApi.getAll())
  const { data: experienceData } = useSWR('admin-experience', () => experienceApi.getAll())
  const { data: testimonialsData } = useSWR('admin-testimonials', () => testimonialsApi.getAll())
  const { data: messagesData } = useSWR('admin-messages', () => messagesApi.getAll())

  const counts = {
    'Total Projects': projectsData?.data?.length || 0,
    'Skills': skillsData?.data?.length || 0,
    'Experience': experienceData?.data?.length || 0,
    'Testimonials': testimonialsData?.data?.length || 0,
    // 'Messages': messagesData?.data?.length || 0,
  }

  const unreadMessages = messagesData?.data?.filter((m) => !m.read).length || 0

  return (
    <main className="">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your portfolio admin dashboard
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.label === 'Messages' && unreadMessages > 0 && (
                    <span className="px-2 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                      {unreadMessages} new
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {counts[stat.label as keyof typeof counts]}
                  </p>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/dashboard/projects?action=new"
              className="text-center p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground whitespace-nowrap">Add Project</span>
            </Link>
            <Link
              href="/admin/dashboard/skills?action=new"
              className="text-center p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground whitespace-nowrap">Add Skill</span>
            </Link>
            <Link
              href="/admin/dashboard/experience?action=new"
              className="text-center p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground whitespace-nowrap">Add Experience</span>
            </Link>
            <Link
              href="/admin/dashboard/testimonials?action=new"
              className="text-center p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium text-foreground whitespace-nowrap">Add Review</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Messages</h2>
            <Link href="/admin/dashboard/messages" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {messagesData?.data?.slice(0, 4).map((message) => (
              <div
                key={message._id}
                className={`p-3 rounded-lg ${message.read ? 'bg-secondary/50' : 'bg-primary/5 border border-primary/20'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">{message.name}</p>
                    <p className="text-xs text-muted-foreground">{message.email}</p>
                  </div>
                  {!message.read && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {message.message}
                </p>
              </div>
            )) || (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No messages yet
                </p>
              )}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
