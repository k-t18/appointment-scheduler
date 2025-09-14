import type { Dayjs } from 'dayjs';

export interface MonthsDropdownProps {
  /** Current anchor date (any date in the selected month). Defaults to today when uncontrolled. */
  value?: Dayjs;
  /** Called with the 1st of the newly selected month */
  onChange?: (firstOfMonth: Dayjs) => void;

  /** Year to render; defaults to value.year() (or today’s year when uncontrolled) */
  year?: number;

  /** Optional limits (inclusive). Use "YYYY-MM-01" as a good practice. */
  minMonth?: string; // ISO YYYY-MM-DD, interpreted as that month
  maxMonth?: string; // ISO YYYY-MM-DD

  /** Disabled state */
  disabled?: boolean;

  /** Pass-through className (for emotion/tw users) */
  className?: string;
}
