type AboutSectionProps = {
    title: string;
    paragraphs: string[];
};

export function AboutSection({
    title,
    paragraphs,
}: AboutSectionProps) {
    return (
        <section className="px-6 py-24 max-w-3xl mx-auto">
            <h2 className="text-2xl mb-8">
                {title}
            </h2>

            <div className="space-y-12 leading-8">
                {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
        </section>
    );
}