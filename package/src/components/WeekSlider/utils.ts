import dayjs, { Dayjs } from "dayjs";
import type { WeekSelection } from "./types";

export const getStartOfWeek = (date: Dayjs, weekStartsOn: "monday" | "sunday" = "monday"): Dayjs => {
  const day = date.day();
  if (weekStartsOn === "monday") {
    return date.subtract(day === 0 ? 6 : day - 1, "day");
  } else {
    return date.subtract(day, "day");
  }
};

export const createWeekSelection = (date: Dayjs, weekStart: Dayjs, weekEnd: Dayjs): WeekSelection => {
  return {
    selectedDate: date.format("YYYY-MM-DD"),
    weekStart: weekStart.format("YYYY-MM-DD"),
    weekEnd: weekEnd.format("YYYY-MM-DD"),
    dayOfWeek: date.day(),
    dayName: date.format("dddd"),
    displayDate: date.format("ddd, MMM D"),
    isToday: date.isSame(dayjs(), "day"),
    isWeekend: date.day() === 0 || date.day() === 6,
  };
};
