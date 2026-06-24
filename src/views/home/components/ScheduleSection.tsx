import type { MonthlySchedule } from "@/src/features/calendar/calendar.types";
import { createCalendarDays } from "@/src/features/calendar/calendar.utils";

type ScheduleSectionProps = {
    title: string;
    schedule: MonthlySchedule | null;
};

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

function parseTargetMonth(targetMonth: string) {
    const [year, month] = targetMonth.split("-").map(Number);

    return { year, month };
}

export function ScheduleSection({ title, schedule }: ScheduleSectionProps) {
    if (!schedule) {
        return (
            <section className="px-6 py-24 max-w-3xl mx-auto">
                <h2 className="text-2xl mb-8">{title}</h2>

                <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
                    <p className="leading-7 text-[#4B3425]">
                        今月のお休みは準備中です。
                    </p>
                </div>
            </section>
        );
    }

    const { year, month } = parseTargetMonth(schedule.targetMonth);
    const calendarDays = createCalendarDays(year, month);

    return (
        <section id="schedule" className="px-6 py-24 max-w-3xl mx-auto">
            <h2 className="text-2xl mb-8">{title}</h2>

            <div className="rounded-3xl bg-white/60 p-6 shadow-sm">
                <div className="mx-auto max-w-md">
                    <p className="mb-6 text-lg">
                        {year}年{month}月
                    </p>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {weekDays.map((day) => (
                            <div key={day} className="py-2 text-[#8A8178]">
                                {day}
                            </div>
                        ))}

                        {calendarDays.map((day, index) => {
                            const isClosed =
                                day !== null && schedule.closedDays.includes(day);

                            if (day === null) {
                                return <div key={`empty-${index}`} className="h-10 w-10" />;
                            }

                            return (
                                <div
                                    key={day}
                                    className={[
                                        "h-10 w-10 mx-auto flex items-center justify-center rounded-full",
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

                    {schedule.monthlyMessage && (
                        <p className="mt-8 text-sm leading-7 text-[#4B3425]">
                            {schedule.monthlyMessage}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}