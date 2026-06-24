import { microcmsClient } from "@/src/lib/microcms";

import type {
  MicroCMSMonthlySchedule,
  MonthlySchedule,
} from "./calendar.types";

function parseClosedDays(value: string): number[] {
  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((day): day is number => typeof day === "number");
  } catch {
    return [];
  }
}

export async function getMonthlySchedule(
  targetMonth: string
): Promise<MonthlySchedule | null> {
  const response = await microcmsClient.getList<MicroCMSMonthlySchedule>({
    endpoint: "monthly-schedules",
    queries: {
      filters: `targetMonth[equals]${targetMonth}`,
      limit: 1,
      orders: "-publishedAt",
    },
  });

  const schedule = response.contents[0];

  if (!schedule) {
    return null;
  }

  return {
    targetMonth: schedule.targetMonth,
    closedDays: parseClosedDays(schedule.closedDays),
    monthlyMessage: schedule.monthlyMessage,
  };
}