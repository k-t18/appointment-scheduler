/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const Select = styled.select<{ disabled?: boolean }>`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: #2a3547;
  outline: none;
  background: ${({ disabled }) => (disabled ? '#f3f4f6' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:focus {
    border-color: #2a3547;
    box-shadow: 0 0 0 1px #2a3547;
  }
`;
