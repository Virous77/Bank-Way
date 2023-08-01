import { styled } from "styled-components";

export const PayHeader = styled.div<{ $style: string }>`
  ${(props) => props.$style};

  button {
    background-color: var(--main-font-color);
    color: var(--body-color);
    padding: 6px 20px;
    border-radius: 5px;
    transition: all 300ms ease-in-out;

    &:hover {
      opacity: 0.9;
      scale: 1.02;
    }
  }
`;
