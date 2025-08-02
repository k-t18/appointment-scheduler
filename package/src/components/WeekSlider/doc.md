# 📘 WeeklySlider Component Documentation

The `WeeklySlider` component is a reusable React UI component for selecting a date within a weekly calendar view. It supports navigation between weeks, availability indication, keyboard accessibility, and date validation logic.

---

## 🧩 Component Purpose

- Show a **week view** (7 days) based on a selected or current date
- Allow **navigation** to previous or next weeks
- Let users **select a date**, respecting availability and disabled rules
- **Highlight today’s date** (optional)
- Trigger **callbacks** for selected date and visible week

---

## 🔧 Props: `WeeklySliderProps`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedDate` | `string` (YYYY-MM-DD) | `null` | Externally passed selected date. Used to set the initial selection. |
| `onDateSelect` | `(selection: { selected: string, start: string, end: string }) => void` | — | Callback when a user selects a date |
| `onWeekChange` | `(start: string, end: string) => void` | — | Callback when the visible week range changes |
| `disabledDates` | `string[]` | `[]` | Dates (in YYYY-MM-DD) to explicitly disable from selection |
| `availableDates` | `string[]` | `undefined` | If set, only these dates will be considered selectable |
| `minDate` | `string` | `undefined` | Minimum date allowed for navigation/selection |
| `maxDate` | `string` | `undefined` | Maximum date allowed for navigation/selection |
| `excludeWeekends` | `boolean` | `false` | Disable selection of Saturdays and Sundays |
| `excludePastDates` | `boolean` | `true` | Prevent selecting dates before today |
| `highlightToday` | `boolean` | `true` | Automatically highlight today on initial render |
| `weekStartsOn` | `'monday' \| 'sunday'` | `'monday'` | Controls whether weeks start on Monday or Sunday |
| `showWeekRange` | `boolean` | `false` | Whether to show week label like "Aug 1 - Aug 7, 2025" |
| `showDateCount` | `boolean` | `true` | Whether to show availability count badge on dates |
| `dateAvailability` | `Record<string, number>` | `{}` | Optional slot availability per date, used with `showDateCount` |
| `disabled` | `boolean` | `false` | Disables all interaction if true |
| `className` | `string` | `undefined` | Optional custom class for styling container |

---

## 📦 Internal Logic (via `useWeeklySlider` hook)

### State:
- `startDate`: First day of the current visible week
- `selectedInternalDate`: Internally selected date (`Dayjs` object)

### Computed:
- `weekDates`: Array of 7 `Dayjs` objects representing the visible week
- `weekEnd`: Last day of the current week
- `weekRange`: Formatted string like "Aug 1 - Aug 7, 2025"
- `canGoPrevious` / `canGoNext`: Controls for week navigation bounds

### Validation Functions:
- `isDateDisabled(date)`: Combines rules like weekends, past, min/max, available/disabled
- `hasAvailability(date)`: Checks if a date has availability or not based on `dateAvailability`

### Event Handlers:
- `handlePrev()` / `handleNext()`: Navigate to previous or next week
- `handleDateClick(date)`: Select a new date, trigger `onDateSelect`

### Effects:
- On mount:
  - Sync `selectedDate` or `highlightToday`
  - Trigger `onWeekChange` for the initial week
- Keyboard arrow support (`←` and `→`)

---

## 💡 Behavior Summary

| Scenario | Behavior |
|----------|----------|
| No `selectedDate`, but `highlightToday = true` | Today is selected by default |
| Click on a valid date | That date is selected, `onDateSelect` is called |
| Press ← or → keys | Week slides to previous or next |
| Dates outside bounds | Are **disabled** (not clickable or focusable) |
| Dates with availability | Show badges if `showDateCount = true` |
| Component is disabled | All interactivity is blocked |

---

## 🖼 Example Usage

```tsx
<WeeklySlider
  selectedDate="2025-08-02"
  onDateSelect={({ selected }) => console.log("Selected:", selected)}
  onWeekChange={(start, end) => console.log("Week:", start, end)}
  availableDates={["2025-08-01", "2025-08-02", "2025-08-03"]}
  dateAvailability={{
    "2025-08-01": 3,
    "2025-08-02": 5,
    "2025-08-03": 0,
  }}
  highlightToday={true}
  excludeWeekends={true}
  showWeekRange={true}
/>
```

---

## 🧪 Format Requirements

- All dates must be in **`YYYY-MM-DD`** format (e.g., `"2025-08-02"`)
- The component uses `dayjs()` internally for all date logic

---

## 🧼 Accessibility Features

- Keyboard support (`ArrowLeft`, `ArrowRight`)
- `aria-label`, `aria-pressed`, `aria-disabled` on each date
- Focusable only if not disabled