type AboutSectionProps = {
    title: string;
    paragraphs: string[];
};

export function AboutSection({ title, paragraphs }: AboutSectionProps) {
    return (
        <section className="bg-[#F7F4EE] px-6 py-16 md:py-28">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-xs tracking-[0.28em] text-[#8A8178] md:text-sm">
                    ABOUT
                </p>

                <h2 className="text-2xl font-light leading-relaxed md:text-4xl">
                    {title}
                </h2>

                <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[#4B3425] md:mt-12 md:space-y-8 md:leading-9">
                    {paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </section>
    );
}