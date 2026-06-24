"use client";

import { useRef, useState } from "react";
import { toBlob } from "html-to-image";

import type { MonthlySchedule } from "@/src/features/calendar/calendar.types";
import {
  createCalendarDays,
  getNextMonth,
  getPreviousMonth,
} from "@/src/features/calendar/calendar.utils";

import { CalendarImageCard } from "./components/CalendarImageCard";
import messages from "./messages/ja.json";

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

export function AdminCalendarView() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [closedDays, setClosedDays] = useState<number[]>([]);
  const [monthlyMessage, setMonthlyMessage] = useState(
    "今月もよろしくお願いします。"
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const imageRef = useRef<HTMLDivElement>(null);

  const calendarDays = createCalendarDays(currentYear, currentMonth);

  const toggleClosedDay = (day: number) => {
    setClosedDays((current) =>
      current.includes(day)
        ? current.filter((closedDay) => closedDay !== day)
        : [...current, day].sort((a, b) => a - b)
    );
  };

  const handlePreviousMonth = () => {
    const previous = getPreviousMonth(currentYear, currentMonth);

    setCurrentYear(previous.year);
    setCurrentMonth(previous.month);
    setClosedDays([]);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleNextMonth = () => {
    const next = getNextMonth(currentYear, currentMonth);

    setCurrentYear(next.year);
    setCurrentMonth(next.month);
    setClosedDays([]);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handlePublish = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const schedule: MonthlySchedule = {
      targetMonth: `${currentYear}-${String(currentMonth).padStart(2, "0")}`,
      closedDays,
      monthlyMessage,
    };

    try {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schedule),
      });

      if (!response.ok) {
        throw new Error("Failed to publish schedule");
      }

      setSuccessMessage("ホームページに反映しました。");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch {
      setErrorMessage(
        "保存できませんでした。少し時間をおいて、もう一度お試しください。"
      );
    }
  };

  const handleDownloadImage = async () => {
  if (!imageRef.current) {
    return;
  }

  setErrorMessage("");

  try {
    const blob = await toBlob(imageRef.current, {
      cacheBust: true,
      pixelRatio: 1,
      backgroundColor: "#F7F4EE",
    });

    if (!blob) {
      throw new Error("Failed to create image");
    }

    const fileName = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}-schedule.png`;

    const file = new File([blob], fileName, {
      type: "image/png",
    });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "営業カレンダー",
      });

      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = fileName;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
    } catch (error) {
    console.error(error);

    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }

    setErrorMessage("画像を保存できませんでした。もう一度お試しください。");
  }
};

  return (
    <main className="min-h-screen bg-[#F7F4EE] px-6 py-10 text-[#2B2B2B]">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl">{messages.title}</h1>
        <p className="mt-4 text-[#8A8178]">{messages.description}</p>

        <section className="mt-10 rounded-3xl bg-white/70 p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDCB] text-lg"
              aria-label="前の月"
            >
              ＜
            </button>

            <p className="text-xl">
              {currentYear}年{currentMonth}月
            </p>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8DDCB] text-lg"
              aria-label="次の月"
            >
              ＞
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {weekDays.map((day) => (
              <div key={day} className="py-2 text-[#8A8178]">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const isClosed = day !== null && closedDays.includes(day);

              if (day === null) {
                return <div key={`empty-${index}`} className="h-11 w-11" />;
              }

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleClosedDay(day)}
                  className={[
                    "mx-auto flex h-11 w-11 items-center justify-center rounded-full text-base transition",
                    isClosed
                      ? "bg-[#4B3425] text-white"
                      : "bg-transparent text-[#2B2B2B]",
                  ].join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <label className="text-lg" htmlFor="monthly-message">
            {messages.monthlyMessageLabel}
          </label>

          <p className="mt-2 text-sm text-[#8A8178]">
            {messages.monthlyMessageHelp}
          </p>

          <textarea
            id="monthly-message"
            value={monthlyMessage}
            onChange={(event) => setMonthlyMessage(event.target.value)}
            className="mt-4 min-h-28 w-full rounded-3xl border border-[#E8DDCB] bg-white/70 p-4 leading-7 outline-none"
          />
        </section>

        {successMessage && (
          <p className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-center text-green-700">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
            {errorMessage}
          </p>
        )}

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={handlePublish}
            className="w-full rounded-full bg-[#4B3425] px-6 py-4 text-white"
          >
            {messages.publishButton}
          </button>

          <button
            type="button"
            onClick={handleDownloadImage}
            className="w-full rounded-full border border-[#4B3425] px-6 py-4 text-[#4B3425]"
          >
            {messages.imageButton}
          </button>
        </div>

        <section className="mt-12">
  <h2 className="mb-4 text-xl">画像プレビュー</h2>

  <div className="overflow-hidden rounded-3xl bg-white/70 p-4 shadow-sm">
    <div className="aspect-square w-full overflow-hidden rounded-2xl">
      <div className="origin-top-left scale-[0.48]">
        <CalendarImageCard
          year={currentYear}
          month={currentMonth}
          closedDays={closedDays}
          monthlyMessage={monthlyMessage}
        />
      </div>
    </div>
  </div>
</section>

<div className="fixed left-[-9999px] top-0">
  <div ref={imageRef}>
    <CalendarImageCard
      year={currentYear}
      month={currentMonth}
      closedDays={closedDays}
      monthlyMessage={monthlyMessage}
    />
  </div>
</div>
      </div>
    </main>
  );
}