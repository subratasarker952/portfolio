'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useUIStore } from '@/store'
import { authApi } from '@/services/api'
import {
  AdminHeader,
  AdminSidebar,
} from '@/components/admin/admin-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const { sidebarOpen } = useUIStore()

  const {
    isAuthenticated,
    token,
    logout,
  } = useAuthStore()

  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        router.push('/admin')
        return
      }

      try {
        const response = await authApi.verify()

        if (!response.success || !response.data?.valid) {
          logout()
          router.push('/admin')
        }
      } catch (error) {
        logout()
        router.push('/admin')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, [token, router, logout])

  // Loading
  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ease-in-out
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}