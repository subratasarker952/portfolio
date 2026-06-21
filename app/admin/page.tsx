'use client'

import { useState, useEffect } from 'react' // ✅ useEffect ইমপোর্ট করা হয়েছে
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authApi } from '@/services/api'
import { useAuthStore } from '@/store'
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  
  // ✅ Zustand থেকে setToken এবং isAuthenticated নেওয়া হয়েছে
  const setToken = useAuthStore((state) => state.setToken) 
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated) 
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ 
    resolver: zodResolver(loginSchema), 
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(data.email, data.password)
      
      if (response.success && response.data?.token) {
        setToken(response.data.token) 
        toast.success('Welcome back!')
        router.replace('/admin/dashboard') 
      } else {
        toast.error(response.error || 'Invalid credentials')
      }
    } catch (error) {
      toast.error('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ ঐচ্ছিক: ইউজার লগড ইন থাকলে লগইন পেজ রেন্ডার হওয়ার আগেই null রিটার্ন করতে পারেন 
  // (এতে রিডাইরেক্ট হওয়ার সময় লগইন ফর্মের ফ্ল্যাশ বা চোখের পলক পড়া বন্ধ হবে)
  if (isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">D</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access the dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  disabled={isLoading}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                'Signing in...'
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}