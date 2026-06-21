import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { ProjectsSection } from '@/components/sections/projects-section'
// import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer />
    </main>
  )
}
