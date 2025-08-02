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
  const [selectedInternalDate, setSelectedInternalDate] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState(() => getStartOfWeek(today, weekStartsOn));

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

  // ==========================================
  // DATE VALIDATION LOGIC
  // ==========================================

  const isDateDisabled = useCallback(
    (date: Dayjs): boolean => {
      const dateStr = date.format('YYYY-MM-DD');

      // Check if explicitly disabled
      if (disabledDates.includes(dateStr)) return true;

      // Check if not in available dates (if provided)
      if (availableDates && !availableDates.includes(dateStr)) return true;

      // Check date range constraints
      if (minDate && date.isBefore(dayjs(minDate), 'day')) return true;
      if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true;

      // Check past dates
      if (excludePastDates && date.isBefore(today, 'day')) return true;

      // Check weekends
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

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const handlePrev = useCallback(() => {
    if (disabled || !canGoPrevious) return;
    const newStart = startDate.subtract(7, 'day');
    setStartDate(newStart);
    onWeekChange?.(newStart.format('YYYY-MM-DD'), newStart.add(6, 'day').format('YYYY-MM-DD'));
  }, [disabled, canGoPrevious, startDate, onWeekChange]);

  const handleNext = useCallback(() => {
    if (disabled || !canGoNext) return;
    const newStart = startDate.add(7, 'day');
    setStartDate(newStart);
    onWeekChange?.(newStart.format('YYYY-MM-DD'), newStart.add(6, 'day').format('YYYY-MM-DD'));
  }, [disabled, canGoNext, startDate, onWeekChange]);

  const handleDateClick = useCallback(
    (date: Dayjs) => {
      if (disabled || isDateDisabled(date)) return;
      setSelectedInternalDate(date);
      const selection = createWeekSelection(date, startDate, weekEnd);
      onDateSelect?.(selection);
    },
    [disabled, isDateDisabled, startDate, weekEnd, onDateSelect],
  );

  // Initial mount setup
  useEffect(() => {
    if (selectedDate) {
      const selected = dayjs(selectedDate);
      setSelectedInternalDate(selected);
      setStartDate(getStartOfWeek(selected, weekStartsOn));
    } else if (highlightToday) {
      setSelectedInternalDate(today);
      setStartDate(getStartOfWeek(today, weekStartsOn));
    }
  }, []); // only on mount

  // Notify parent on initial week mount
  useEffect(() => {
    onWeekChange?.(startDate.format('YYYY-MM-DD'), weekEnd.format('YYYY-MM-DD'));
  }, []); // only on mount

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
