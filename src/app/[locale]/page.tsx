import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickStats } from "@/components/QuickStats";
import { About } from "@/components/About";
import { TechnologyAreas } from "@/components/TechnologyAreas";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { TikTokHighlight } from "@/components/TikTokHighlight";
import { JoinCTA } from "@/components/JoinCTA";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col overflow-hidden">
        <ScrollReveal direction="none">
          <Hero />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <QuickStats />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <About />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <TechnologyAreas />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <FeaturedProjects />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <TikTokHighlight />
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <JoinCTA />
        </ScrollReveal>
        <ScrollReveal direction="none">
          <LocationMap />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
