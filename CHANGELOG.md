# Changelog

## [2.1.1] – 2025-07-26

### Fixed

- **WeeklySlider** now correctly reacts to external `selectedDate` prop changes — the week view jumps to the new date’s week when `selectedDate` is updated by the parent.
- The initial `onWeekChange` callback now fires exactly once on mount (no duplicate calls).
- Keyboard navigation cleanup fixed: the ArrowLeft/ArrowRight listener is properly removed when the component unmounts.

### Added

- **Date-range constraints**
  - `disabledDates: string[]` and `availableDates: string[]` props to explicitly disable or whitelist specific dates.
  - `minDate` / `maxDate` props to clamp week navigation.
- **Business-logic flags**
  - `excludePastDates` (default `true`) to prevent selecting days before today.
  - `excludeWeekends` to gray out Saturdays & Sundays.
  - `highlightToday` to visually emphasize today’s date.
  - `weekStartsOn: "monday" | "sunday"` to choose week start.
- **Availability display**
  - `showDateCount` and `dateAvailability: Record<string, number>` to render per-day slot-counts via `AvailabilityBadge`.
- **UI / accessibility**
  - `showWeekRange` to toggle the “MMM D – MMM D, YYYY” header.
  - `disabled` prop to disable all interactions and apply “faded” styling.
  - Improved ARIA roles, keyboard support, and hover/focus states.
