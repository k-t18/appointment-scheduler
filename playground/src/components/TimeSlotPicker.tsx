/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Sun, Video, Moon } from "lucide-react";
import dayjs from "dayjs";
import styled from "@emotion/styled";

interface TimeSlotPickerProps {
  startTime?: string;
  endTime?: string;
  interval?: number;
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

// -------------------
// Emotion Styled Components
// -------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  @media (min-width: 640px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const GroupWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: 640px) {
    flex-wrap: nowrap;
  }
`;

const IconWrapper = styled.div`
  margin-top: 0.25rem;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: #4b5563; /* text-gray-600 */
  }
`;

const SlotGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
`;

const TimeButton = styled.button<{ selected: boolean }>`
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  min-width: 80px;
  flex-shrink: 0;
  background-color: ${({ selected }) => (selected ? "#00abc9" : "#fff")};
  color: ${({ selected }) =>
    selected ? "#fff" : "#1f2937"}; /* text-gray-800 */
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#00abc9" : "#f3f4f6")};
  }
`;

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
    <GroupWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <SlotGrid>
        {times.map((time) => (
          <TimeButton
            key={time}
            selected={selectedTime === time}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </TimeButton>
        ))}
      </SlotGrid>
    </GroupWrapper>
  );

  return (
    <Container>
      {renderGroup("Morning", <Sun />, morning)}
      {renderGroup("Afternoon", <Video />, afternoon)}
      {renderGroup("Evening", <Moon />, evening)}
    </Container>
  );
}
