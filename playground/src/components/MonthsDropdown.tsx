/** @jsxImportSource @emotion/react */
import { useState } from "react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import styled from "@emotion/styled";

dayjs.extend(localeData);

// 🗓 Month list
const monthNames = dayjs.months();

// 🧱 Styled Select
const Select = styled.select`
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.375rem 0.75rem; /* px-3 py-1.5 */
  font-size: 0.875rem; /* text-sm */
  color: #2a3547;
  outline: none;

  &:focus {
    border-color: #2a3547;
    box-shadow: 0 0 0 1px #2a3547;
  }
`;

export default function MonthsDropdown() {
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <Select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
    >
      {monthNames.map((month, index) => (
        <option key={index} value={index}>
          {month} {currentYear}
        </option>
      ))}
    </Select>
  );
}
