import { AboutSection } from "./components/AboutSection";
import { BreadSection } from "./components/BreadSection";
import { HeroSection } from "./components/HeroSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { VisitSection } from "./components/VisitSection";
import messages from "./messages/ja.json";

export function HomeView() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#2B2B2B]">
      <HeroSection title={messages.hero.title} />

      <AboutSection
        title={messages.about.title}
        paragraphs={messages.about.paragraphs}
      />

      <ScheduleSection title={messages.schedule.title} />

      <BreadSection title={messages.breads.title} items={messages.breads.items} />

      <VisitSection title={messages.visit.title} items={messages.visit.items} />
    </main>
  );
}