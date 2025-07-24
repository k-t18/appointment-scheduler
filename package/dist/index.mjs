// src/components/WeekSlider.tsx
import { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var getStartOfWeek = (date) => {
  const day = date.day();
  return date.subtract(day === 0 ? 6 : day - 1, "day");
};
function WeekSlider() {
  const [startDate, setStartDate] = useState(getStartOfWeek(dayjs()));
  const weekDates = Array.from(
    { length: 7 },
    (_, i) => startDate.add(i, "day")
  );
  const today = dayjs();
  const handlePrev = () => setStartDate(startDate.subtract(7, "day"));
  const handleNext = () => setStartDate(startDate.add(7, "day"));
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("button", { onClick: handlePrev, children: /* @__PURE__ */ jsx(ChevronLeft, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: weekDates.map((date) => {
      const isToday = date.isSame(today, "day");
      const bgClass = isToday ? "bg-[#D7F7FB]" : "bg-white";
      const textColor = isToday ? "text-[#00abc9]" : "text-[#2a3547]";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `w-16 py-2 px-2 flex flex-col items-center rounded-lg shadow-sm ${bgClass} ${textColor}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: date.format("ddd") }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: date.format("D") })
          ]
        },
        date.format("YYYY-MM-DD")
      );
    }) }),
    /* @__PURE__ */ jsx("button", { onClick: handleNext, children: /* @__PURE__ */ jsx(ChevronRight, {}) })
  ] });
}

// src/components/MonthsDropdown.tsx
import { useState as useState2 } from "react";
import dayjs2 from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
dayjs2.extend(localeData);
var monthNames = dayjs2.months();
function MonthsDropdown() {
  const currentMonth = dayjs2().month();
  const currentYear = dayjs2().year();
  const [selectedMonth, setSelectedMonth] = useState2(currentMonth);
  return /* @__PURE__ */ jsx2(
    "select",
    {
      className: "border border-gray-300 rounded-md px-3 py-1.5 text-sm text-[#2a3547] focus:outline-none",
      value: selectedMonth,
      onChange: (e) => setSelectedMonth(Number(e.target.value)),
      children: monthNames.map((month, index) => /* @__PURE__ */ jsxs2("option", { value: index, children: [
        month,
        " ",
        currentYear
      ] }, index))
    }
  );
}

// src/components/TimeSlotPicker.tsx
import { useState as useState3 } from "react";
import { Sun, Video, Moon } from "lucide-react";
import dayjs3 from "dayjs";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var getTimeSlots = (start, end, step) => {
  const slots = [];
  let time = dayjs3(`1970-01-01T${start}`);
  const endTime = dayjs3(`1970-01-01T${end}`);
  while (time.isBefore(endTime) || time.isSame(endTime)) {
    slots.push(time.format("HH:mm"));
    time = time.add(step, "minute");
  }
  return slots;
};
var categorizeSlots = (slots) => {
  return {
    morning: slots.filter((t) => parseInt(t.split(":")[0]) < 12),
    afternoon: slots.filter((t) => {
      const hr = parseInt(t.split(":")[0]);
      return hr >= 12 && hr < 16;
    }),
    evening: slots.filter((t) => parseInt(t.split(":")[0]) >= 16)
  };
};
function TimeSlotPicker({
  startTime = "00:00",
  endTime = "23:45",
  interval = 15
}) {
  const [selectedTime, setSelectedTime] = useState3(null);
  const slots = getTimeSlots(startTime, endTime, interval);
  const { morning, afternoon, evening } = categorizeSlots(slots);
  const renderGroup = (label, icon, times) => /* @__PURE__ */ jsxs3("div", { className: " flex items-start gap-4 flex-wrap sm:flex-nowrap w-full", children: [
    /* @__PURE__ */ jsx3("div", { className: "mt-1 flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsx3("div", { className: "grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))]", children: times.map((time) => /* @__PURE__ */ jsx3(
      "button",
      {
        onClick: () => setSelectedTime(time),
        className: `border border-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-all min-w-[80px] flex-shrink-0
              ${selectedTime === time ? "bg-[#00abc9] text-white" : "text-gray-800 bg-white"}`,
        children: time
      },
      time
    )) })
  ] });
  return /* @__PURE__ */ jsxs3("div", { className: "space-y-6 w-full px-2 sm:px-0", children: [
    renderGroup(
      "Morning",
      /* @__PURE__ */ jsx3(Sun, { className: "w-5 h-5 text-gray-600" }),
      morning
    ),
    renderGroup(
      "Afternoon",
      /* @__PURE__ */ jsx3(Video, { className: "w-5 h-5 text-gray-600" }),
      afternoon
    ),
    renderGroup(
      "Evening",
      /* @__PURE__ */ jsx3(Moon, { className: "w-5 h-5 text-gray-600" }),
      evening
    )
  ] });
}

// src/components/Legends.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var Legends = ({ legends }) => {
  return /* @__PURE__ */ jsx4("div", { className: "flex gap-4 p-2 border border-gray-300 rounded-md w-fit", children: legends.map((legend) => /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: `w-5 h-5 rounded-sm flex-shrink-0 `,
        style: legend.variant === "outline" ? { border: `2px solid ${legend.color}` } : { backgroundColor: legend.color }
      }
    ),
    /* @__PURE__ */ jsx4("span", { className: "text-sm text-gray-700 font-medium", children: legend.label })
  ] }, legend.label)) });
};
var Legends_default = Legends;
export {
  Legends_default as Legends,
  MonthsDropdown,
  TimeSlotPicker,
  WeekSlider
};
