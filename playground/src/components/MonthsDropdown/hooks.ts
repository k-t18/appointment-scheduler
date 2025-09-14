import { useMemo, useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import type { MonthsDropdownProps } from './types';

dayjs.extend(localeData);

export function useMonthsDropdown({ value, onChange, year, minMonth, maxMonth, disabled }: MonthsDropdownProps) {
  // Uncontrolled fallback: today
  const [internal, setInternal] = useState<Dayjs>(() => dayjs());

  const effective = value ?? internal;
  const y = year ?? effective.year();
  const months = useMemo(() => dayjs.months(), []);
  const selectedMonthIndex = effective.month();

  const isMonthDisabled = useCallback(
    (monthIndex: number) => {
      if (!minMonth && !maxMonth) return !!disabled;
      const firstOf = dayjs().year(y).month(monthIndex).date(1);
      if (minMonth && firstOf.isBefore(dayjs(minMonth), 'month')) return true;
      if (maxMonth && firstOf.isAfter(dayjs(maxMonth), 'month')) return true;
      return !!disabled;
    },
    [y, minMonth, maxMonth, disabled],
  );

  const handleChange = useCallback(
    (monthIndex: number) => {
      if (isMonthDisabled(monthIndex)) return;
      const firstOfMonth = dayjs().year(y).month(monthIndex).date(1);
      onChange?.(firstOfMonth);
      if (value === undefined) setInternal(firstOfMonth); // uncontrolled path
    },
    [y, onChange, value, isMonthDisabled],
  );

  return {
    months,
    y,
    selectedMonthIndex,
    handleChange,
    isMonthDisabled,
  };
}
