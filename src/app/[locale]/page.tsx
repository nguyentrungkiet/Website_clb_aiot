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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <QuickStats />
        <About />
        <TechnologyAreas />
        <FeaturedProjects />
        <TikTokHighlight />
        <JoinCTA />
        <LocationMap />
      </main>
      <Footer />
    </>
  );
}
