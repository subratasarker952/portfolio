'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { aboutApi, messagesApi } from '@/services/api'
import { Send, Mail, User, MessageSquare, MapPin, Phone, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import useSWR from 'swr'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>


export function ContactSection() {
  const { data } = useSWR('about', () => aboutApi.get())
  
  const about = data?.data
  
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: about?.email|| "subratasarker952@gmail.com",
      href: `mailto:${about?.email||"subratasarker952@gmail.com"}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: about?.phone|| "+8801576919246",
      href: `tel:${about?.phone||"+8801576919246"}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: about?.location|| "Dhaka, Bangladesh",
      href: "https://maps.app.goo.gl/ZL47vYWZLtTjcoGk9",
    },
  ]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      await messagesApi.create(data)
      setIsSubmitted(true)
      reset()
      toast.success('Message sent successfully!')
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-secondary/20 py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 h-112 w-md rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 top-0 h-112 w-md rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm font-medium text-primary">
              Get In Touch
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's Build Something Amazing
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have an idea or project in mind? I am always open to freelance work,
            collaborations, and full-time opportunities.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h3 className="text-xl font-semibold">Contact Info</h3>
              <p className="text-muted-foreground">
                Reach me through any of these channels
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition group-hover:scale-105">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {info.label}
                    </p>

                    {info.href ? (
                      <a
                        href={info.href}
                        className="font-medium text-foreground transition hover:text-primary"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-accent/10 p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
                <span className="font-medium">Available for Work</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Open for freelance, remote and full-time opportunities.
              </p>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-xl sm:p-10">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>

                  <h3 className="mb-2 text-2xl font-semibold">
                    Message Sent!
                  </h3>

                  <p className="text-muted-foreground">
                    I&apos;ll reply to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        placeholder="Your name"
                        className="h-12 rounded-xl pl-10"
                        {...register("name")}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="h-12 rounded-xl pl-10"
                        {...register("email")}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message
                    </label>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                      <Textarea
                        placeholder="Tell me about your project..."
                        className="min-h-35 resize-none rounded-xl pl-10 pt-3"
                        {...register("message")}
                      />
                    </div>

                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
