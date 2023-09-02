import { styled } from "styled-components";

export const MNav = styled.div<{ $style: string }>`
  padding: 5px 2rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #47a992;
  ${(props) => props.$style};
  justify-content: center;
  gap: 3rem;
  z-index: 100;

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

  @media (max-width: 768px) {
    padding: 5px 1rem;
    justify-content: flex-start;
    gap: 2rem;
  }

  p {
    font-size: 15px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;
