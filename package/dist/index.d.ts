import * as react_jsx_runtime from 'react/jsx-runtime';

declare function WeekSlider(): react_jsx_runtime.JSX.Element;

declare function MonthsDropdown(): react_jsx_runtime.JSX.Element;

interface TimeSlotPickerProps {
    startTime?: string;
    endTime?: string;
    interval?: number;
}
declare function TimeSlotPicker({ startTime, endTime, interval, }: TimeSlotPickerProps): react_jsx_runtime.JSX.Element;

interface LegendItem {
    label: string;
    color: string;
    variant?: "solid" | "outline";
}
interface LegendsProps {
    legends: LegendItem[];
}
declare const Legends: React.FC<LegendsProps>;

export { Legends, MonthsDropdown, TimeSlotPicker, WeekSlider };
