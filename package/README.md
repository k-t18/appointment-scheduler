# 📦 appointment-scheduler

A reusable, self-contained appointment scheduling component library built with **React** and styled using **Emotion (CSS-in-JS)**. No Tailwind or global CSS required.

---

## ✨ Features

- 📅 Week slider with date range navigation
- 🕒 Time slot picker with customizable intervals
- 🔽 Month selector dropdown
- 🎨 Legends with status indicators
- 💅 Built-in styles using Emotion (no CSS setup needed)

---

## 📦 Installation

```bash
npm install appointment-scheduler
# or
yarn add appointment-scheduler
```

## 🔧 Usage

```
import {
  WeekSlider,
  MonthsDropdown,
  TimeSlotPicker,
  Legends
} from 'appointment-scheduler';

export default function Example() {
  return (
    <div>
      <WeekSlider />
      <MonthsDropdown />
      <TimeSlotPicker interval={30} />
      <Legends
        legends={[
          { label: "Available", color: "#ffffff", variant: "outline" },
          { label: "Selected", color: "#00abc9" },
          { label: "Blocked", color: "#f87171" }
        ]}
      />
    </div>
  );
}

```

## 🛠 Components

| Component        | Description                        |
| ---------------- | ---------------------------------- |
| `WeekSlider`     | Scrollable 7-day week strip        |
| `MonthsDropdown` | Dropdown to select month + year    |
| `TimeSlotPicker` | Grid-based time slot selector      |
| `Legends`        | Color-coded slot status indicators |
