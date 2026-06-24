export type MonthlySchedule = {
  targetMonth: string;
  closedDays: number[];
  monthlyMessage: string;
};

export type MicroCMSMonthlySchedule = {
  id: string;
  targetMonth: string;
  closedDays: string;
  monthlyMessage: string;
};