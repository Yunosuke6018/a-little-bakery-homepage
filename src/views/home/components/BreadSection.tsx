type BreadItem = {
  name: string;
  description: string;
};

type BreadSectionProps = {
  title: string;
  items: BreadItem[];
};

export function BreadSection({ title, items }: BreadSectionProps) {
  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-8">{title}</h2>

      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl bg-white/60 p-6 shadow-sm"
          >
            <h3 className="text-lg mb-2">{item.name}</h3>
            <p className="leading-7 text-[#4B3425]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}