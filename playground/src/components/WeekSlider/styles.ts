/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

// Types for styled component props
export interface DateCardProps {
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isWeekend: boolean;
  hasAvailability: boolean;
  availabilityCount?: number;
}

export interface ContainerProps {
  disabled?: boolean;
}

export interface NavButtonProps {
  disabled?: boolean;
}

export interface AvailabilityBadgeProps {
  count: number;
}

// ==========================================
// STYLED COMPONENTS
// ==========================================

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const DateGrid = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

export const DateCard = styled.div<DateCardProps>`
  min-width: 4rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.1);
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease-in-out;
  position: relative;

  // Base styling
  background-color: ${({ isToday, isSelected, isDisabled, hasAvailability }) => {
    if (isDisabled) return '#f8f9fa';
    if (isSelected) return '#3b82f6';
    if (isToday) return '#D7F7FB';
    if (!hasAvailability) return '#fef2f2';
    return '#fff';
  }};

  color: ${({ isToday, isSelected, isDisabled, hasAvailability }) => {
    if (isDisabled) return '#6b7280';
    if (isSelected) return '#fff';
    if (isToday) return '#00abc9';
    if (!hasAvailability) return '#dc2626';
    return '#2a3547';
  }};

  border: 2px solid
    ${({ isSelected, isToday, hasAvailability, isDisabled }) => {
      if (isSelected) return '#3b82f6';
      if (isToday) return '#00abc9';
      if (isDisabled) return '#e5e7eb';
      if (!hasAvailability) return '#fecaca';
      return 'transparent';
    }};

  // Hover effects
  &:hover {
    ${({ isDisabled, isSelected }) =>
      !isDisabled &&
      !isSelected &&
      `
      background-color: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(16, 24, 40, 0.1);
    `}
  }

  // Weekend styling
  ${({ isWeekend, isDisabled, isSelected }) =>
    isWeekend &&
    !isDisabled &&
    !isSelected &&
    `
    background-color: #f9fafb;
    border-color: #f3f4f6;
  `}

  @media (max-width: 640px) {
    min-width: 3rem;
    padding: 0.375rem;
  }
`;

export const DayLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

export const DayNumber = styled.span`
  font-size: 1.125rem;
  font-weight: 700;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

export const AvailabilityBadge = styled.span<AvailabilityBadgeProps>`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: ${({ count }) => (count > 0 ? '#10b981' : '#ef4444')};
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.25rem;
  border-radius: 0.5rem;
  min-width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

export const NavButton = styled.button<NavButtonProps>`
  border: none;
  background: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  color: ${({ disabled }) => (disabled ? '#9ca3af' : '#374151')};

  &:hover {
    ${({ disabled }) =>
      !disabled &&
      `
      background-color: #f3f4f6;
      color: #111827;
    `}
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

export const WeekInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin: 0 0.5rem;
`;

export const WeekRange = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

export const MonthYear = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

// ==========================================
// THEME CONFIGURATION
// ==========================================

export const theme = {
  colors: {
    primary: '#3b82f6',
    primaryLight: '#D7F7FB',
    primaryDark: '#00abc9',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#cbd5e1',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#2a3547',
      900: '#111827',
    },
    background: {
      white: '#ffffff',
      light: '#f8f9fa',
      danger: '#fef2f2',
      disabled: '#f8fafc',
    },
    border: {
      default: 'transparent',
      light: '#e5e7eb',
      danger: '#fecaca',
      focus: '#3b82f6',
    },
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(16, 24, 40, 0.1)',
    md: '0 4px 6px rgba(16, 24, 40, 0.1)',
  },
};
