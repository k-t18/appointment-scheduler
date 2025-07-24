/** @jsxImportSource @emotion/react */
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ⏱ Week start logic
const getStartOfWeek = (date: Dayjs) => {
  const day = date.day();
  return date.subtract(day === 0 ? 6 : day - 1, "day"); // Monday as start
};

// 🧱 Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DateGrid = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const DateCard = styled.div<{ isToday: boolean }>`
  width: 4rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.1);
  background-color: ${({ isToday }) => (isToday ? "#D7F7FB" : "#fff")};
  color: ${({ isToday }) => (isToday ? "#00abc9" : "#2a3547")};
`;

const DayLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`;

const DayNumber = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
`;

const NavButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.25rem;
`;

export default function WeekSlider() {
  const [startDate, setStartDate] = useState(getStartOfWeek(dayjs()));
  const today = dayjs();

  const handlePrev = () => setStartDate(startDate.subtract(7, "day"));
  const handleNext = () => setStartDate(startDate.add(7, "day"));

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    startDate.add(i, "day")
  );

  return (
    <Container>
      <NavButton onClick={handlePrev} aria-label="Previous Week">
        <ChevronLeft />
      </NavButton>

      <DateGrid>
        {weekDates.map((date) => {
          const isToday = date.isSame(today, "day");
          return (
            <DateCard key={date.format("YYYY-MM-DD")} isToday={isToday}>
              <DayLabel>{date.format("ddd")}</DayLabel>
              <DayNumber>{date.format("D")}</DayNumber>
            </DateCard>
          );
        })}
      </DateGrid>

      <NavButton onClick={handleNext} aria-label="Next Week">
        <ChevronRight />
      </NavButton>
    </Container>
  );
}
