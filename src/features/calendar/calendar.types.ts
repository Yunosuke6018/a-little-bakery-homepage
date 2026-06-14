export type MonthlySchedule = {
  year: number;
  month: number;
  closedDays: number[];
  monthlyMessage?: string;
};