import { styled } from "styled-components";

export const MNav = styled.div<{ $style: string }>`
  padding: 5px 2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #47a992;
  ${(props) => props.$style};
  justify-content: center;
  gap: 3rem;

  button {
    background-color: green;
    color: var(--exact-white-color);
    padding: 4px 20px;

    &:hover {
      opacity: 0.8;
    }
  }

  b {
    color: var(--exact-white-color);
    font-weight: bold;
    width: 25px;
    height: 25px;
    border-radius: 100px;
    ${(props) => props.$style};
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: 3%;
    bottom: 10%;

    &:hover {
      background-color: green;
    }
  }
`;
