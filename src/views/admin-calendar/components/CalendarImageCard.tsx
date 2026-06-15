import { createCalendarDays } from "@/src/features/calendar/calendar.utils";

type CalendarImageCardProps = {
  year: number;
  month: number;
  closedDays: number[];
  monthlyMessage: string;
};

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

export function CalendarImageCard({
  year,
  month,
  closedDays,
  monthlyMessage,
}: CalendarImageCardProps) {
  const calendarDays = createCalendarDays(year, month);

  return (
    <div className="flex h-[1080px] w-[1080px] flex-col bg-[#F7F4EE] p-20 text-[#2B2B2B]">
      <h1 className="text-6xl">a little bakery+</h1>

      <h2 className="mt-12 text-4xl">
        {year}年{month}月のお休み
      </h2>

      <div className="mt-12 grid grid-cols-7 gap-4 text-center">
        {weekDays.map((day) => (
          <div key={day} className="text-3xl text-[#8A8178]">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const isClosed = day !== null && closedDays.includes(day);

          if (day === null) {
            return <div key={`empty-${index}`} className="h-20 w-20" />;
          }

          return (
            <div
              key={day}
              className={[
                "mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl",
                isClosed ? "bg-[#4B3425] text-white" : "text-[#2B2B2B]",
              ].join(" ")}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-auto border-t border-[#E8DDCB] pt-10">
            <p className="text-3xl leading-relaxed text-[#4B3425]">
                {monthlyMessage}
            </p>
        </div>
    </div>
  );
}