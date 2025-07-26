/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import from separate files
import type { WeeklySliderProps } from "./types";
import { getStartOfWeek, createWeekSelection } from "./utils";
import { Container, DateGrid, DateCard, DayLabel, DayNumber, AvailabilityBadge, NavButton, WeekInfo, WeekRange, MonthYear } from "./styles";

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function WeeklySlider({
  selectedDate = null,
  onDateSelect,
  onWeekChange,
  disabledDates = [],
  availableDates,
  minDate,
  maxDate,
  showWeekRange = false,
  excludeWeekends = false,
  excludePastDates = true,
  highlightToday = true,
  weekStartsOn = "monday",
  showDateCount = false,
  dateAvailability = {},
  className,
  disabled = false,
}: WeeklySliderProps) {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================

  const [startDate, setStartDate] = useState(() => getStartOfWeek(dayjs(), weekStartsOn));

  const today = useMemo(() => dayjs(), []);
  const selectedDayjs = useMemo(() => (selectedDate ? dayjs(selectedDate) : null), [selectedDate]);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================

  const weekDates = useMemo(() => Array.from({ length: 7 }, (_, i) => startDate.add(i, "day")), [startDate]);

  const weekEnd = useMemo(() => startDate.add(6, "day"), [startDate]);

  const weekRange = useMemo(() => {
    const start = startDate.format("MMM D");
    const end = weekEnd.format("MMM D");
    const year = startDate.format("YYYY");

    if (startDate.month() === weekEnd.month()) {
      return `${start} - ${end}, ${year}`;
    } else {
      return `${start} - ${end}, ${year}`;
    }
  }, [startDate, weekEnd]);

  // Navigation constraints
  const canGoPrevious = useMemo(() => {
    if (!minDate) return true;
    const minDayjs = dayjs(minDate);
    const prevWeekStart = startDate.subtract(7, "day");
    return prevWeekStart.isAfter(minDayjs, "day") || prevWeekStart.isSame(minDayjs, "day");
  }, [startDate, minDate]);

  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    const maxDayjs = dayjs(maxDate);
    const nextWeekStart = startDate.add(7, "day");
    return nextWeekStart.isBefore(maxDayjs, "day") || nextWeekStart.isSame(maxDayjs, "day");
  }, [startDate, maxDate]);

  // ==========================================
  // DATE VALIDATION LOGIC
  // ==========================================

  const isDateDisabled = useCallback(
    (date: Dayjs): boolean => {
      const dateStr = date.format("YYYY-MM-DD");

      // Check if explicitly disabled
      if (disabledDates.includes(dateStr)) return true;

      // Check if not in available dates (if provided)
      if (availableDates && !availableDates.includes(dateStr)) return true;

      // Check date range constraints
      if (minDate && date.isBefore(dayjs(minDate), "day")) return true;
      if (maxDate && date.isAfter(dayjs(maxDate), "day")) return true;

      // Check past dates
      if (excludePastDates && date.isBefore(today, "day")) return true;

      // Check weekends
      if (excludeWeekends && (date.day() === 0 || date.day() === 6)) return true;

      return false;
    },
    [disabledDates, availableDates, minDate, maxDate, excludePastDates, excludeWeekends, today]
  );

  const hasAvailability = useCallback(
    (date: Dayjs): boolean => {
      const dateStr = date.format("YYYY-MM-DD");
      if (showDateCount && dateAvailability[dateStr] !== undefined) {
        return dateAvailability[dateStr] > 0;
      }
      return !isDateDisabled(date);
    },
    [showDateCount, dateAvailability, isDateDisabled]
  );

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  const handlePrev = useCallback(() => {
    if (disabled || !canGoPrevious) return;

    const newStartDate = startDate.subtract(7, "day");
    setStartDate(newStartDate);

    onWeekChange?.(newStartDate.format("YYYY-MM-DD"), newStartDate.add(6, "day").format("YYYY-MM-DD"));
  }, [disabled, canGoPrevious, startDate, onWeekChange]);

  const handleNext = useCallback(() => {
    if (disabled || !canGoNext) return;

    const newStartDate = startDate.add(7, "day");
    setStartDate(newStartDate);

    onWeekChange?.(newStartDate.format("YYYY-MM-DD"), newStartDate.add(6, "day").format("YYYY-MM-DD"));
  }, [disabled, canGoNext, startDate, onWeekChange]);

  const handleDateClick = useCallback(
    (date: Dayjs) => {
      if (disabled || isDateDisabled(date)) return;

      const selection = createWeekSelection(date, startDate, weekEnd);
      onDateSelect?.(selection);
    },
    [disabled, isDateDisabled, startDate, weekEnd, onDateSelect]
  );

  // ==========================================
  // EFFECTS
  // ==========================================

  // Update week when selected date changes externally
  useEffect(() => {
    if (selectedDayjs) {
      const newStartDate = getStartOfWeek(selectedDayjs, weekStartsOn);
      if (!newStartDate.isSame(startDate, "day")) {
        setStartDate(newStartDate);
      }
    }
  }, [selectedDayjs, weekStartsOn, startDate]);

  // Notify parent of initial week
  useEffect(() => {
    onWeekChange?.(startDate.format("YYYY-MM-DD"), weekEnd.format("YYYY-MM-DD"));
  }, []); // Only on mount

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          handlePrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, handlePrev, handleNext]);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Container className={className} disabled={disabled}>
      <NavButton onClick={handlePrev} disabled={disabled || !canGoPrevious} aria-label="Previous Week" title="Previous Week">
        <ChevronLeft size={20} />
      </NavButton>

      {showWeekRange && (
        <WeekInfo>
          <WeekRange>{weekRange}</WeekRange>
          <MonthYear>{startDate.format("MMMM YYYY")}</MonthYear>
        </WeekInfo>
      )}

      <DateGrid>
        {weekDates.map((date) => {
          const dateStr = date.format("YYYY-MM-DD");
          const isToday = highlightToday && date.isSame(today, "day");
          const isSelected = selectedDayjs?.isSame(date, "day") || false;
          const dateDisabled = isDateDisabled(date);
          const dateHasAvailability = hasAvailability(date);
          const availabilityCount = dateAvailability[dateStr];

          return (
            <DateCard
              key={dateStr}
              isToday={isToday}
              isSelected={isSelected}
              isDisabled={dateDisabled}
              isWeekend={date.day() === 0 || date.day() === 6}
              hasAvailability={dateHasAvailability}
              availabilityCount={availabilityCount}
              onClick={() => handleDateClick(date)}
              title={`${date.format("dddd, MMMM D, YYYY")}${availabilityCount !== undefined ? ` - ${availabilityCount} slots available` : ""}`}
              role="button"
              tabIndex={dateDisabled ? -1 : 0}
              aria-label={`Select ${date.format("dddd, MMMM D, YYYY")}`}
              aria-pressed={isSelected}
              aria-disabled={dateDisabled}
            >
              <DayLabel>{date.format("ddd")}</DayLabel>
              <DayNumber>{date.format("D")}</DayNumber>

              {showDateCount && availabilityCount !== undefined && (
                <AvailabilityBadge count={availabilityCount}>{availabilityCount}</AvailabilityBadge>
              )}
            </DateCard>
          );
        })}
      </DateGrid>

      <NavButton onClick={handleNext} disabled={disabled || !canGoNext} aria-label="Next Week" title="Next Week">
        <ChevronRight size={20} />
      </NavButton>
    </Container>
  );
}
