import styled from "styled-components";

export const Main = styled.main``;

export const Form = styled.form<{ $style: string }>`
  ${(props) => props.$style};
  gap: 1.5rem;
  width: 100%;
`;

export const Select = styled.select`
  outline: none;
  padding: 5px;
  text-transform: capitalize;
  width: 100%;
  padding: 3px;
  font-weight: 500;
  font-size: 17px;
  margin-top: 1rem;
  color: var(--exact-font-color);
  border-radius: 5px;
  border: 2px solid transparent;
  transition: all 300ms ease-in-out;
  background-color: var(--exact-white-color);

  &:hover {
    border: 2px solid var(--exact-font-color);
  }
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
  background-color: var(--exact-white-color);
  color: var(--exact-font-color);
`;

export const Button = styled.button`
  padding: 11px;
  background-color: var(--exact-font-color);
  color: var(--exact-white-color);
  font-size: 15px;
  border-radius: 3px;
  transition: all 300ms ease-in-out;
  opacity: 0.9;

  &:hover {
    scale: 1.02;
    opacity: 1;
  }
`;
