import Legends from './components/Legends';
import MonthsDropdown from './components/MonthsDropdown';
import TimeSlotPicker from './components/TimeSlotPicker';
import { WeeklySlider, type WeekSelection } from './components/WeekSlider';
// import { WeekSlider, MonthsDropdown, Legends, TimeSlotPicker } from "appointment-scheduler";

import styled from '@emotion/styled';

function App() {
  // Outer wrapper
  const Container = styled.div`
    margin-top: 1.25rem; /* mt-5 */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.375rem; /* rounded-md */
    padding: 1rem; /* p-4 */
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 640px) {
      overflow-x: visible;
      max-width: 90vw;
    }

    @media (min-width: 768px) {
      max-width: 800px;
    }

    @media (min-width: 1024px) {
      max-width: 1000px;
    }
  `;

  // Inner flex row
  const TopRightFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <Container>
      <TopRightFlex>
        <WeeklySlider
          selectedDate="2025-08-02"
          onDateSelect={(selected: WeekSelection) => console.log('Selected:', selected)}
          onWeekChange={(start, end) => console.log('Week:', start, end)}
          availableDates={['2025-08-01', '2025-08-02', '2025-08-03']}
          dateAvailability={{
            '2025-08-01': 3,
            '2025-08-02': 5,
            '2025-08-03': 7,
          }}
          highlightToday={true}
          excludeWeekends={false}
          showWeekRange={true}
        />
        <div className="">
          <MonthsDropdown />
        </div>
      </TopRightFlex>
      <div className="mt-4">
        <TimeSlotPicker startTime={'08:00'} endTime={'22:00'} interval={15} />
      </div>
      <div className="flex justify-end mt-4">
        <Legends
          legends={[
            { label: 'Available', color: '#e7e8ec', variant: 'outline' },
            { label: 'Selected', color: '#00abc9', variant: 'solid' },
            { label: 'Blocked', color: '#ff6b6b', variant: 'solid' },
            { label: 'Leave', color: '#9b5de5', variant: 'solid' },
            { label: 'Holiday', color: '#ff914d', variant: 'solid' },
            { label: 'Booked', color: '#d3d3d3', variant: 'solid' },
          ]}
        />
      </div>
    </Container>
  );
}

export default App;
