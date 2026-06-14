type HeroSectionProps = {
  title: string;
};

export function HeroSection({
  title,
}: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <h1 className="text-4xl font-light tracking-wide text-center">
        {title}
      </h1>
    </section>
  );
}