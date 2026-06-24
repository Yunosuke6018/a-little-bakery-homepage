import { NextResponse } from "next/server";

import type { MonthlySchedule } from "@/src/features/calendar/calendar.types";
import { microcmsClient } from "@/src/lib/microcms";

function isMonthlySchedule(value: unknown): value is MonthlySchedule {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const schedule = value as MonthlySchedule;

  return (
    typeof schedule.targetMonth === "string" &&
    Array.isArray(schedule.closedDays) &&
    schedule.closedDays.every((day) => typeof day === "number") &&
    typeof schedule.monthlyMessage === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!isMonthlySchedule(body)) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const createdSchedule = await microcmsClient.create({
    endpoint: "monthly-schedules",
    content: {
      targetMonth: body.targetMonth,
      closedDays: JSON.stringify(body.closedDays),
      monthlyMessage: body.monthlyMessage,
    },
  });

  return NextResponse.json({
    message: "Schedule saved",
    schedule: createdSchedule,
  });
}