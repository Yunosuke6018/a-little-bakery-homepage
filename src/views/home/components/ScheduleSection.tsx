type ScheduleSectionProps = {
  title: string;
};

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

const calendarDays = [
  null,
  null,
  null,
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const closedDays = [3, 10, 17, 24];

export function ScheduleSection({ title }: ScheduleSectionProps) {
  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-8">{title}</h2>

      <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
        <div className="mx-auto max-w-md">
          <p className="mb-6 text-lg">2026年6月</p>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {weekDays.map((day) => (
              <div key={day} className="py-2 text-[#8A8178]">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const isClosed = day !== null && closedDays.includes(day);

              return (
                <div
                  key={`${day}-${index}`}
                  className={[
                    "h-10 w-10 mx-auto flex items-center justify-center rounded-full",
                    day === null ? "text-transparent" : "",
                    isClosed
                      ? "bg-[#4B3425] text-white"
                      : "text-[#2B2B2B]",
                  ].join(" ")}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm leading-7 text-[#4B3425]">
            今月もよろしくお願いします。
          </p>
        </div>
      </div>
    </section>
  );
}