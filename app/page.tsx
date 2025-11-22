import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ServicesSection } from '@/components/services-section'
import { FormationSection } from '@/components/formation-section'
import { StatsSection } from '@/components/stats-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { SectionNavigator } from '@/components/section-navigator'

export default function Home() {
  return (
    <>
      <Header />
      <SectionNavigator />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <PhilosophySection />
        <FormationSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
