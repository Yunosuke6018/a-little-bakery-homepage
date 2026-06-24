type HeroSectionProps = {
    title: string;
    catchCopy: string;
    subtitle: string;
};

export function HeroSection({
    title,
    catchCopy,
    subtitle,
}: HeroSectionProps) {
    return (
        <section id="hero" className="relative overflow-hidden bg-[#F7F4EE]">
            <div className="relative mx-auto aspect-video w-full max-w-6xl md:aspect-auto md:h-[70vh] md:min-h-[520px]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-contain md:object-cover"
                >
                    <source
                        src="/videos/little_bakery_hero.mp4"
                        type="video/mp4"
                    />
                </video>

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex h-full items-center justify-center px-6">
                    <div className="max-w-3xl text-center text-[#F7F4EE] drop-shadow-xl">
                        <p className="mb-6 text-xs tracking-[0.35em] md:text-sm">
                            {catchCopy}
                        </p>

                        <h1 className="text-4xl font-light tracking-wide md:text-7xl">
                            {title}
                        </h1>

                        <p className="mt-6 text-sm leading-8 md:text-lg">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}