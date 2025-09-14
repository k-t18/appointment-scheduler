import { useState, useEffect, useCallback, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { WeeklySliderProps } from './types';
import { getStartOfWeek, createWeekSelection } from './utils';

export function useWeeklySlider(props: WeeklySliderProps) {
  const {
    selectedDate = null,
    onDateSelect,
    onWeekChange,
    disabledDates = [],
    availableDates,
    minDate,
    maxDate,
    excludeWeekends = false,
    excludePastDates = true,
    highlightToday = true,
    weekStartsOn = 'monday',
    showDateCount = true,
    dateAvailability = {},
    disabled = false,
  } = props;

  const today = useMemo(() => dayjs(), []);
  // init once; will re-sync via the single effect below
  const [selectedInternalDate, setSelectedInternalDate] = useState<Dayjs | null>(highlightToday ? today : null);
  const [startDate, setStartDate] = useState<Dayjs>(() => getStartOfWeek(highlightToday ? today : dayjs(), weekStartsOn));

  // Derived
  const weekDates = useMemo(() => Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day')), [startDate]);
  const weekEnd = useMemo(() => startDate.add(6, 'day'), [startDate]);
  const weekRange = useMemo(() => {
    const start = startDate.format('MMM D');
    const end = weekEnd.format('MMM D');
    const year = startDate.format('YYYY');
    return `${start} - ${end}, ${year}`;
  }, [startDate, weekEnd]);

  const canGoPrevious = useMemo(() => {
    if (!minDate) return true;
    const minDayjs = dayjs(minDate);
    const prevWeekStart = startDate.subtract(7, 'day');
    return prevWeekStart.isSame(minDayjs, 'day') || prevWeekStart.isAfter(minDayjs, 'day');
  }, [startDate, minDate]);

  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    const maxDayjs = dayjs(maxDate);
    const nextWeekStart = startDate.add(7, 'day');
    return nextWeekStart.isSame(maxDayjs, 'day') || nextWeekStart.isBefore(maxDayjs, 'day');
  }, [startDate, maxDate]);

  // Validation
  const isDateDisabled = useCallback(
    (date: Dayjs): boolean => {
      const dateStr = date.format('YYYY-MM-DD');
      if (disabledDates.includes(dateStr)) return true;
      if (availableDates && !availableDates.includes(dateStr)) return true;
      if (minDate && date.isBefore(dayjs(minDate), 'day')) return true;
      if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true;
      if (excludePastDates && date.isBefore(today, 'day')) return true;
      if (excludeWeekends && (date.day() === 0 || date.day() === 6)) return true;
      return false;
    },
    [disabledDates, availableDates, minDate, maxDate, excludePastDates, excludeWeekends, today],
  );

  const hasAvailability = useCallback(
    (date: Dayjs): boolean => {
      const dateStr = date.format('YYYY-MM-DD');
      if (showDateCount && dateAvailability[dateStr] !== undefined) {
        return dateAvailability[dateStr] > 0;
      }
      return !isDateDisabled(date);
    },
    [showDateCount, dateAvailability, isDateDisabled],
  );

  // Handlers
  const handlePrev = useCallback(() => {
    if (disabled || !canGoPrevious) return;
    const newStart = startDate.subtract(7, 'day');
    setStartDate(newStart);
  }, [disabled, canGoPrevious, startDate]);

  const handleNext = useCallback(() => {
    if (disabled || !canGoNext) return;
    const newStart = startDate.add(7, 'day');
    setStartDate(newStart);
  }, [disabled, canGoNext, startDate]);

  const handleDateClick = useCallback(
    (date: Dayjs) => {
      if (disabled || isDateDisabled(date)) return;
      setSelectedInternalDate(date);
      onDateSelect?.(createWeekSelection(date, startDate, weekEnd));
    },
    [disabled, isDateDisabled, startDate, weekEnd, onDateSelect],
  );

  // 1) Single sync effect: respond to external selectedDate / config changes
  useEffect(() => {
    const base = selectedDate ? dayjs(selectedDate) : highlightToday ? today : null;
    if (base) {
      setSelectedInternalDate(base);
      setStartDate(getStartOfWeek(base, weekStartsOn));
    }
  }, [selectedDate, weekStartsOn, highlightToday, today]);

  // 2) Notify parent whenever startDate changes (covers mount + prev/next + prop changes)
  useEffect(() => {
    onWeekChange?.(startDate.format('YYYY-MM-DD'), weekEnd.format('YYYY-MM-DD'));
  }, [startDate, weekEnd, onWeekChange]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [disabled, handlePrev, handleNext]);

  return {
    today,
    weekDates,
    weekRange,
    weekEnd,
    startDate,
    selectedInternalDate,
    isDateDisabled,
    hasAvailability,
    handlePrev,
    handleNext,
    handleDateClick,
    canGoPrevious,
    canGoNext,
    dateAvailability,
    showDateCount,
  };
}
