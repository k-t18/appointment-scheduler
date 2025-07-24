import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getStartOfWeek = (date: Dayjs) => {
  const day = date.day();
  return date.subtract(day === 0 ? 6 : day - 1, "day"); // Monday as start
};

export default function WeekSlider() {
  const [startDate, setStartDate] = useState(getStartOfWeek(dayjs()));

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    startDate.add(i, "day")
  );
  const today = dayjs();

  const handlePrev = () => setStartDate(startDate.subtract(7, "day"));
  const handleNext = () => setStartDate(startDate.add(7, "day"));

  return (
    <div className="flex items-center gap-4">
      <button onClick={handlePrev}>
        <ChevronLeft />
      </button>

      <div className="flex gap-3">
        {weekDates.map((date) => {
          const isToday = date.isSame(today, "day");

          const bgClass = isToday ? "bg-[#D7F7FB]" : "bg-white";
          const textColor = isToday ? "text-[#00abc9]" : "text-[#2a3547]";

          return (
            <div
              key={date.format("YYYY-MM-DD")}
              className={`w-16 py-2 px-2 flex flex-col items-center rounded-lg shadow-sm ${bgClass} ${textColor}`}
            >
              <span className="text-sm font-semibold">
                {date.format("ddd")}
              </span>
              <span className="text-lg font-bold">{date.format("D")}</span>
            </div>
          );
        })}
      </div>

      <button onClick={handleNext}>
        <ChevronRight />
      </button>
    </div>
  );
}
