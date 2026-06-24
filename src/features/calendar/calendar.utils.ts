export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayIndexMondayStart(year: number, month: number) {
  const jsDay = new Date(year, month - 1, 1).getDay();

  return jsDay === 0 ? 6 : jsDay - 1;
}

export function createCalendarDays(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayIndexMondayStart(year, month);

  return [
    ...Array.from({ length: firstDayIndex }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

export function getPreviousMonth(year: number, month: number) {
  if (month === 1) {
    return { year: year - 1, month: 12 };
  }

  return { year, month: month - 1 };
}

export function getNextMonth(year: number, month: number) {
  if (month === 12) {
    return { year: year + 1, month: 1 };
  }

  return { year, month: month + 1 };
}