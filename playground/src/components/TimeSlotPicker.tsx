import { useState } from "react";
import { Sun, Video, Moon } from "lucide-react";
import dayjs from "dayjs";

interface TimeSlotPickerProps {
  startTime?: string; // e.g., "08:00"
  endTime?: string; // e.g., "22:00"
  interval?: number; // e.g., 15 or 30
}

const getTimeSlots = (start: string, end: string, step: number): string[] => {
  const slots: string[] = [];
  let time = dayjs(`1970-01-01T${start}`);
  const endTime = dayjs(`1970-01-01T${end}`);
  while (time.isBefore(endTime) || time.isSame(endTime)) {
    slots.push(time.format("HH:mm"));
    time = time.add(step, "minute");
  }
  return slots;
};

const categorizeSlots = (slots: string[]) => {
  return {
    morning: slots.filter((t) => parseInt(t.split(":")[0]) < 12),
    afternoon: slots.filter((t) => {
      const hr = parseInt(t.split(":")[0]);
      return hr >= 12 && hr < 16;
    }),
    evening: slots.filter((t) => parseInt(t.split(":")[0]) >= 16),
  };
};

export default function TimeSlotPicker({
  startTime = "00:00",
  endTime = "23:45",
  interval = 15,
}: TimeSlotPickerProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const slots = getTimeSlots(startTime, endTime, interval);
  const { morning, afternoon, evening } = categorizeSlots(slots);

  const renderGroup = (
    label: string,
    icon: React.ReactNode,
    times: string[]
  ) => (
    <div className=" flex items-start gap-4 flex-wrap sm:flex-nowrap w-full">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div className="grid w-full gap-3 grid-cols-[repeat(auto-fill,minmax(80px,1fr))]">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`border border-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-all min-w-[80px] flex-shrink-0
              ${
                selectedTime === time
                  ? "bg-[#00abc9] text-white"
                  : "text-gray-800 bg-white"
              }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 w-full px-2 sm:px-0">
      {renderGroup(
        "Morning",
        <Sun className="w-5 h-5 text-gray-600" />,
        morning
      )}
      {renderGroup(
        "Afternoon",
        <Video className="w-5 h-5 text-gray-600" />,
        afternoon
      )}
      {renderGroup(
        "Evening",
        <Moon className="w-5 h-5 text-gray-600" />,
        evening
      )}
    </div>
  );
}
