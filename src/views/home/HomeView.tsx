import { getMonthlySchedule } from "@/src/features/calendar/calendar.repository";

import { AboutSection } from "./components/AboutSection";
import { BreadSection } from "./components/BreadSection";
import { HeroSection } from "./components/HeroSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { VisitSection } from "./components/VisitSection";
import { MovieSection } from "./components/MovieSection";
import messages from "./messages/ja.json";

function getCurrentTargetMonth() {
    const today = new Date();

    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
    )}`;
}

export async function HomeView() {
    const schedule = await getMonthlySchedule(getCurrentTargetMonth());

    return (
        <main className="min-h-screen bg-[#F7F4EE] text-[#2B2B2B]">
            <HeroSection
                title={messages.hero.title}
                catchCopy={messages.hero.catch}
                subtitle={messages.hero.subtitle}
            />

            <AboutSection
                title={messages.about.title}
                paragraphs={messages.about.paragraphs}
            />

            <MovieSection
                title={messages.movie.title}
                description={messages.movie.description}
                youtubeEmbedUrl={messages.movie.youtubeEmbedUrl}
            />

            <BreadSection
                title={messages.breads.title}
                description={messages.breads.description}
                heroImage={messages.breads.heroImage}
                gallery={messages.breads.gallery}
                footerLink={messages.breads.footerLink}
            />

            <ScheduleSection
                title={messages.schedule.title}
                schedule={schedule}
            />

            <VisitSection title={messages.visit.title} items={messages.visit.items} />
        </main>
    );
}