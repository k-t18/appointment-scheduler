import Legends from "./components/Legends";
import MonthsDropdown from "./components/MonthsDropdown";
import TimeSlotPicker from "./components/TimeSlotPicker";
import WeekSlider from "./components/WeekSlider";

function App() {
  return (
    <div className="mt-5 border border-gray-300 rounded-md p-4 w-full max-w-full overflow-x-auto sm:overflow-visible sm:max-w-[90vw] md:max-w-[800px] lg:max-w-[1000px] mx-auto">
      <div className="flex justify-end items-center">
        <WeekSlider />
        <div className="ms-20">
          <MonthsDropdown />
        </div>
      </div>
      <div className="mt-4">
        <TimeSlotPicker startTime={"08:00"} endTime={"22:00"} interval={15} />
      </div>
      <div className="flex justify-end mt-4">
        <Legends
          legends={[
            { label: "Available", color: "#e7e8ec", variant: "outline" },
            { label: "Selected", color: "#00abc9", variant: "solid" },
            { label: "Blocked", color: "#ff6b6b", variant: "solid" },
            { label: "Leave", color: "#9b5de5", variant: "solid" },
            { label: "Holiday", color: "#ff914d", variant: "solid" },
            { label: "Booked", color: "#d3d3d3", variant: "solid" },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
