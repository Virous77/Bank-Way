import styled from "styled-components";

export const Main = styled.main`
  h1 {
    margin-bottom: 1.5rem;
    font-size: var(--secondary-font-size);
  }
`;

export const WrapTab = styled.div`
  display: grid !important;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem !important;
`;

export const Tab = styled.button`
  padding: 10px;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: all 300ms ease-in-out;
  color: var(--exact-white-color);

  &:hover {
    scale: 1.02;
  }

  @media (max-width: 440px) {
    font-size: 10px;
    padding: 8px;
  }
`;
