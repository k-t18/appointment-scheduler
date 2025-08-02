/** @jsxImportSource @emotion/react */
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WeeklySliderProps } from './types';
import { Container, DateGrid, DateCard, DayLabel, DayNumber, AvailabilityBadge, NavButton, WeekInfo, WeekRange, MonthYear } from './styles';
import { useWeeklySlider } from './hooks';

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
  weekStartsOn = 'monday',
  showDateCount = true,
  dateAvailability = {},
  className,
  disabled = false,
}: WeeklySliderProps) {
  const {
    today,
    weekDates,
    weekRange,
    startDate,
    selectedInternalDate,
    isDateDisabled,
    hasAvailability,
    handlePrev,
    handleNext,
    handleDateClick,
    canGoPrevious,
    canGoNext,
  } = useWeeklySlider({
    selectedDate,
    onDateSelect,
    onWeekChange,
    disabledDates,
    availableDates,
    minDate,
    maxDate,
    excludeWeekends,
    excludePastDates,
    highlightToday,
    weekStartsOn,
    showDateCount,
    dateAvailability,
    disabled,
  });
  return (
    <Container className={className} disabled={disabled}>
      <NavButton onClick={handlePrev} disabled={disabled || !canGoPrevious} aria-label="Previous Week" title="Previous Week">
        <ChevronLeft size={20} />
      </NavButton>

      {showWeekRange && (
        <WeekInfo>
          <WeekRange>{weekRange}</WeekRange>
          <MonthYear>{startDate.format('MMMM YYYY')}</MonthYear>
        </WeekInfo>
      )}

      <DateGrid>
        {weekDates.map((date) => {
          const dateStr = date.format('YYYY-MM-DD');
          const isSelected = selectedInternalDate?.isSame(date, 'day');
          const isToday = date.isSame(today, 'day');
          const isDisabled = isDateDisabled(date);
          const availabilityCount = dateAvailability[dateStr];

          return (
            <DateCard
              key={dateStr}
              isToday={isToday}
              isSelected={isSelected}
              isDisabled={isDisabled}
              isWeekend={date.day() === 0 || date.day() === 6}
              hasAvailability={hasAvailability(date)}
              availabilityCount={availabilityCount}
              onClick={() => handleDateClick(date)}
              title={`${date.format('dddd, MMMM D, YYYY')}${availabilityCount !== undefined ? ` - ${availabilityCount} slots available` : ''}`}
              role="button"
              tabIndex={isDisabled ? -1 : 0}
              aria-label={`Select ${date.format('dddd, MMMM D, YYYY')}`}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
            >
              <DayLabel>{date.format('ddd')}</DayLabel>
              <DayNumber>{date.format('D')}</DayNumber>
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
