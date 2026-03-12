import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div
        className="relative min-h-screen bg-white"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <Header />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </SmoothScrollProvider>
  );
}