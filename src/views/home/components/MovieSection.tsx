type MovieSectionProps = {
    title: string;
    description: string;
    youtubeEmbedUrl: string;
};

export function MovieSection({
    title,
    description,
    youtubeEmbedUrl,
}: MovieSectionProps) {
    return (
        <section id="movie" className="bg-[#F7F4EE] px-6 py-16 md:py-24">
            <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs tracking-[0.28em] text-[#8A8178] md:text-sm">
                    MOVIE
                </p>

                <h2 className="text-2xl font-light md:text-4xl">{title}</h2>

                <p className="mt-5 max-w-2xl leading-8 text-[#4B3425]">
                    {description}
                </p>

                <div className="mt-10 overflow-hidden rounded-3xl bg-white/60 shadow-sm">
                    <iframe
                        className="aspect-video w-full"
                        src={youtubeEmbedUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}