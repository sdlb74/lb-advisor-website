import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ServicesSection } from '@/components/services-section'
import { FormationSection } from '@/components/formation-section'
import { StatsSection } from '@/components/stats-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { ScrollLock } from '@/components/scroll-lock'

export default function Home() {
  return (
    <>
      <ScrollLock />
      <Header />
      <main className="snap-container h-screen w-full overflow-y-scroll scroll-smooth">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FormationSection />
        <StatsSection />
        <PhilosophySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
