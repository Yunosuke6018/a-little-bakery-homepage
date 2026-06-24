import Image from "next/image";

type FooterLink = {
    label: string;
    url: string;
};

type BreadSectionProps = {
    title: string;
    description: string;
    heroImage: string;
    gallery: string[];
    footerLink?: FooterLink;
};

export function BreadSection({
    title,
    description,
    heroImage,
    gallery,
    footerLink,
}: BreadSectionProps) {
    return (
        <section id="breads" className="bg-[#F7F4EE] px-6 py-16 md:py-24">
            <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs tracking-[0.28em] text-[#8A8178] md:text-sm">
                    BREADS
                </p>

                <h2 className="text-2xl font-light md:text-4xl">{title}</h2>

                <p className="mt-5 max-w-2xl leading-8 text-[#4B3425]">
                    {description}
                </p>

                <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl bg-white/60 shadow-sm md:aspect-[16/9]">
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        sizes="(min-width: 768px) 960px, 100vw"
                        className="object-cover"
                    />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-4 md:gap-6">
                    {gallery.map((image, index) => (
                        <div
                            key={image}
                            className={[
                                "relative overflow-hidden rounded-2xl bg-white/60 shadow-sm",
                                index === 0 ? "aspect-[4/5]" : "aspect-square",
                            ].join(" ")}
                        >
                            <Image
                                src={image}
                                alt={`${title} ${index + 1}`}
                                fill
                                sizes="(min-width: 768px) 25vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {footerLink && (
                    <div className="mt-10 text-center">
                        <a
                            href={footerLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-[#4B3425] underline underline-offset-4 transition-opacity hover:opacity-70"
                        >
                            {footerLink.label}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}