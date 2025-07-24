/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";

interface LegendItem {
  label: string;
  color: string; // Hex, RGB, or any valid CSS color
  variant?: "solid" | "outline";
}

interface LegendsProps {
  legends: LegendItem[];
}

// 🧱 Styled Components
const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  width: fit-content;
`;

const LegendGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorBox = styled.div<{ color: string; variant?: "solid" | "outline" }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.125rem;
  flex-shrink: 0;
  ${({ color, variant }) =>
    variant === "outline"
      ? `border: 2px solid ${color}; background-color: transparent;`
      : `background-color: ${color};`}
`;

const Label = styled.span`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  color: #374151; /* text-gray-700 */
`;

const Legends: React.FC<LegendsProps> = ({ legends }) => {
  return (
    <Container>
      {legends.map((legend) => (
        <LegendGroup key={legend.label}>
          <ColorBox color={legend.color} variant={legend.variant} />
          <Label>{legend.label}</Label>
        </LegendGroup>
      ))}
    </Container>
  );
};

export default Legends;
