export interface WeekSelection {
  selectedDate: string; // ISO date string: "2025-07-25"
  weekStart: string; // ISO date string: "2025-07-21"
  weekEnd: string; // ISO date string: "2025-07-27"
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  dayName: string; // "Friday"
  displayDate: string; // "Fri, Jul 25"
  isToday: boolean;
  isWeekend: boolean;
}

export interface WeeklySliderProps {
  // Selection Props
  selectedDate?: string | null;
  onDateSelect?: (selection: WeekSelection) => void;
  onWeekChange?: (weekStart: string, weekEnd: string) => void;

  // Availability Props
  disabledDates?: string[]; // Array of ISO date strings
  availableDates?: string[]; // If provided, only these dates are selectable
  minDate?: string; // Minimum selectable date (ISO string)
  maxDate?: string; // Maximum selectable date (ISO string)

  // Business Logic Props
  showWeekRange?: boolean; // Show week range in header
  excludeWeekends?: boolean;
  excludePastDates?: boolean;
  highlightToday?: boolean;
  weekStartsOn?: "monday" | "sunday";

  // UI Customization Props
  showDateCount?: boolean; // Show available appointment count per date
  dateAvailability?: Record<string, number>; // Date -> available slots count
  className?: string;
  disabled?: boolean;

  // Advanced Props
  timezone?: string; // For proper date calculations
  locale?: string; // For date formatting
}
