type VisitItem = {
    label: string;
    value: string;
};

type FooterLink = {
    label: string;
    url: string;
};

type VisitSectionProps = {
    title: string;
    items: VisitItem[];
    mapEmbedUrl?: string;
    footerLink?: FooterLink;
};

export function VisitSection({
    title,
    items,
    mapEmbedUrl,
    footerLink,
}: VisitSectionProps) {
    return (
        <section id="visit" className="bg-[#F7F4EE] px-6 py-16 md:py-24">
            <div className="mx-auto max-w-5xl">
                <p className="mb-3 text-xs tracking-[0.28em] text-[#8A8178] md:text-sm">
                    VISIT
                </p>

                <h2 className="text-2xl font-light md:text-4xl">{title}</h2>

                <div className="mt-10 rounded-3xl bg-white/60 p-6 shadow-sm">
                    <dl className="space-y-6">
                        {items.map((item) => (
                            <div key={item.label}>
                                <dt className="text-sm text-[#8A8178]">{item.label}</dt>

                                <dd className="mt-1 leading-7">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {mapEmbedUrl && (
                    <div className="mt-8 overflow-hidden rounded-3xl shadow-sm">
                        <iframe
                            src={mapEmbedUrl}
                            title="Google Map"
                            width="100%"
                            height="360"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full"
                        />
                    </div>
                )}

                {footerLink && (
                    <div className="mt-6 text-center">
                        <a
                            href={footerLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full border border-[#4B3425] px-6 py-3 text-[#4B3425] transition hover:bg-[#4B3425] hover:text-white"
                        >
                            {footerLink.label}
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}