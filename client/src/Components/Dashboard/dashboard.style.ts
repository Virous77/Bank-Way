import styled from "styled-components";

export const Head = styled.header`
  padding: 1rem;
  background-color: var(--main-font-color);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  div {
    display: flex;
    align-items: flex-end;
    gap: 4px;
  }

  h1 {
    color: var(--body-color);
    font-size: var(--secondary-font-size);
  }

  p {
    color: var(--body-color);
  }
`;

export const WrapChart = styled.section<{ $style: string }>`
  height: 360px;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  ${(props) => props.$style};
  gap: 2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ChartBox = styled.div`
  h1 {
    margin-bottom: 1.5rem;
    font-size: var(--secondary-font-size);
  }
`;
