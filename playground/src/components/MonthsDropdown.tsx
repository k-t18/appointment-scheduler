import { useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);

const monthNames = dayjs.months(); // ['January', 'February', ..., 'December']

export default function MonthsDropdown() {
  const currentMonth = dayjs().month(); // 0-based
  const currentYear = dayjs().year();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <select
      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-[#2a3547] focus:outline-none"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
    >
      {monthNames.map((month, index) => (
        <option key={index} value={index}>
          {month} {currentYear}
        </option>
      ))}
    </select>
  );
}
