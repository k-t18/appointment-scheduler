/** @jsxImportSource @emotion/react */
import { Select } from './styles';
import { useMonthsDropdown } from './hooks';
import type { MonthsDropdownProps } from './types';

export default function MonthsDropdown(props: MonthsDropdownProps) {
  const { className, disabled } = props;
  const { months, y, selectedMonthIndex, handleChange, isMonthDisabled } = useMonthsDropdown(props);

  return (
    <Select
      className={className}
      value={selectedMonthIndex}
      disabled={disabled}
      onChange={(e) => handleChange(Number(e.target.value))}
      aria-label="Select month"
    >
      {months.map((name, idx) => (
        <option key={idx} value={idx} disabled={isMonthDisabled(idx)}>
          {name} {y}
        </option>
      ))}
    </Select>
  );
}
