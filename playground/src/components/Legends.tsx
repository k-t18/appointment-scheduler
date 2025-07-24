interface LegendItem {
  label: string;
  color: string; // Tailwind-compatible class or custom color (bg-*, border-*, etc.)
  variant?: "solid" | "outline";
}

interface LegendsProps {
  legends: LegendItem[];
}

const Legends: React.FC<LegendsProps> = ({ legends }) => {
  return (
    <div className="flex gap-4 p-2 border border-gray-300 rounded-md w-fit">
      {legends.map((legend) => (
        <div key={legend.label} className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-sm flex-shrink-0 `}
            style={
              legend.variant === "outline"
                ? { border: `2px solid ${legend.color}` }
                : { backgroundColor: legend.color }
            }
          ></div>
          <span className="text-sm text-gray-700 font-medium">
            {legend.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legends;
