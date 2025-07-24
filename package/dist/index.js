"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Legends: () => Legends_default,
  MonthsDropdown: () => MonthsDropdown,
  TimeSlotPicker: () => TimeSlotPicker,
  WeekSlider: () => WeekSlider
});
module.exports = __toCommonJS(index_exports);

// src/components/WeekSlider.tsx
var import_react = require("react");
var import_dayjs = __toESM(require("dayjs"));
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var getStartOfWeek = (date) => {
  const day = date.day();
  return date.subtract(day === 0 ? 6 : day - 1, "day");
};
function WeekSlider() {
  const [startDate, setStartDate] = (0, import_react.useState)(getStartOfWeek((0, import_dayjs.default)()));
  const weekDates = Array.from(
    { length: 7 },
    (_, i) => startDate.add(i, "day")
  );
  const today = (0, import_dayjs.default)();
  const handlePrev = () => setStartDate(startDate.subtract(7, "day"));
  const handleNext = () => setStartDate(startDate.add(7, "day"));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handlePrev, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex gap-3", children: weekDates.map((date) => {
      const isToday = date.isSame(today, "day");
      const bgClass = isToday ? "bg-[#D7F7FB]" : "bg-white";
      const textColor = isToday ? "text-[#00abc9]" : "text-[#2a3547]";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          className: `w-16 py-2 px-2 flex flex-col items-center rounded-lg shadow-sm ${bgClass} ${textColor}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-semibold", children: date.format("ddd") }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-lg font-bold", children: date.format("D") })
          ]
        },
        date.format("YYYY-MM-DD")
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: handleNext, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, {}) })
  ] });
}

// src/components/MonthsDropdown.tsx
var import_react2 = require("react");
var import_dayjs2 = __toESM(require("dayjs"));
var import_localeData = __toESM(require("dayjs/plugin/localeData"));
var import_jsx_runtime2 = require("react/jsx-runtime");
import_dayjs2.default.extend(import_localeData.default);
var monthNames = import_dayjs2.default.months();
function MonthsDropdown() {
  const currentMonth = (0, import_dayjs2.default)().month();
  const currentYear = (0, import_dayjs2.default)().year();
  const [selectedMonth, setSelectedMonth] = (0, import_react2.useState)(currentMonth);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "select",
    {
      className: "border border-gray-300 rounded-md px-3 py-1.5 text-sm text-[#2a3547] focus:outline-none",
      value: selectedMonth,
      onChange: (e) => setSelectedMonth(Number(e.target.value)),
      children: monthNames.map((month, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("option", { value: index, children: [
        month,
        " ",
        currentYear
      ] }, index))
    }
  );
}

// src/components/TimeSlotPicker.tsx
var import_react3 = require("react");
var import_lucide_react2 = require("lucide-react");
var import_dayjs3 = __toESM(require("dayjs"));
var import_jsx_runtime3 = require("react/jsx-runtime");
var getTimeSlots = (start, end, step) => {
  const slots = [];
  let time = (0, import_dayjs3.default)(`1970-01-01T${start}`);
  const endTime = (0, import_dayjs3.default)(`1970-01-01T${end}`);
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
  const [selectedTime, setSelectedTime] = (0, import_react3.useState)(null);
  const slots = getTimeSlots(startTime, endTime, interval);
  const { morning, afternoon, evening } = categorizeSlots(slots);
  const renderGroup = (label, icon, times) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: " flex items-start gap-4 flex-wrap sm:flex-nowrap w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-1 flex-shrink-0", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))]", children: times.map((time) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-6 w-full px-2 sm:px-0", children: [
    renderGroup(
      "Morning",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Sun, { className: "w-5 h-5 text-gray-600" }),
      morning
    ),
    renderGroup(
      "Afternoon",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Video, { className: "w-5 h-5 text-gray-600" }),
      afternoon
    ),
    renderGroup(
      "Evening",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react2.Moon, { className: "w-5 h-5 text-gray-600" }),
      evening
    )
  ] });
}

// src/components/Legends.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Legends = ({ legends }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex gap-4 p-2 border border-gray-300 rounded-md w-fit", children: legends.map((legend) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        className: `w-5 h-5 rounded-sm flex-shrink-0 `,
        style: legend.variant === "outline" ? { border: `2px solid ${legend.color}` } : { backgroundColor: legend.color }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm text-gray-700 font-medium", children: legend.label })
  ] }, legend.label)) });
};
var Legends_default = Legends;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Legends,
  MonthsDropdown,
  TimeSlotPicker,
  WeekSlider
});
