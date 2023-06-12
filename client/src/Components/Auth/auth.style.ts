import { styled } from "styled-components";

export const Main = styled.section`
  margin-top: 1rem;
`;

export const Heading = styled.h2`
  text-align: center;
  font-weight: 400;
  font-size: var(--secondary-font-size);
  margin-bottom: 2rem;
  text-decoration: underline;
  color: var(--modal-font-color) !important;
`;

export const Form = styled.form<{ $style?: string }>`
  ${(props) => props.$style};
  gap: 2rem;
  width: 100%;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
`;
