'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import { testimonialsApi } from '@/services/api'
import type { Testimonial } from '@/types'
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Default testimonials for when MongoDB is not connected
const defaultTestimonials: Testimonial[] = [
  {
    _id: '1',
    clientName: 'Sarah Johnson',
    review: 'Working with this developer was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and exceeded all expectations. The attention to detail and code quality was exceptional.',
    company: 'TechStart Inc.',
    rating: 5,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '2',
    clientName: 'Michael Chen',
    review: 'Incredible work on our SaaS application. The developer understood our vision perfectly and translated it into a beautiful, functional product. Highly recommended for any complex project.',
    company: 'CloudFlow Solutions',
    rating: 5,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '3',
    clientName: 'Emily Davis',
    review: 'The best developer I have worked with in my 10 years of running digital projects. Professional, skilled, and always delivers on time. Our mobile app has received amazing feedback from users.',
    company: 'AppVenture Labs',
    rating: 5,
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '4',
    clientName: 'David Wilson',
    review: 'Transformed our outdated website into a modern, responsive platform that our customers love. The SEO improvements alone have increased our organic traffic by 200%.',
    company: 'Growth Marketing Co.',
    rating: 5,
    createdAt: '',
    updatedAt: '',
  },
]

export function TestimonialsSection() {
  const { data } = useSWR('testimonials', () => testimonialsApi.getAll())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = data?.data?.length ? data.data : defaultTestimonials

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
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
            <span className="text-sm font-medium text-primary">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what my clients have to say about working with me.
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="overflow-hidden py-8">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 relative">
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
        <Quote className="w-6 h-6 text-primary-foreground" />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>

      {/* Review */}
      <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.clientName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-7 h-7 text-primary" />
          )}
        </div>

        {/* Name & Company */}
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.clientName}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.company}</p>
        </div>
      </div>
    </div>
  )
}
