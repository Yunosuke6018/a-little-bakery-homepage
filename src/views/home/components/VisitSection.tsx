type VisitItem = {
    label: string;
    value: string;
};

type VisitSectionProps = {
    title: string;
    items: VisitItem[];
};

export function VisitSection({ title, items }: VisitSectionProps) {
    return (
        <section className="px-6 py-24 max-w-3xl mx-auto">
            <h2 className="text-2xl mb-8">{title}</h2>

            <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
                <dl className="space-y-5">
                    {items.map((item) => (
                        <div key={item.label}>
                            <dt className="text-sm text-[#8A8178]">{item.label}</dt>
                            <dd className="mt-1 leading-7">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}