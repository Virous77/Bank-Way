import { styled } from "styled-components";

export const Heading = styled.h2`
  color: var(--body-color) !important;
  margin-bottom: 1rem;
`;

export const UL = styled.ul<{ $style: string }>`
  ${(props) => props.$style};
  gap: 1rem;
`;

export const Span = styled.span`
  font-weight: 600;
  display: inline-block;
  margin-right: 4px;
`;

export const P = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: var(--body-color) !important;
`;
