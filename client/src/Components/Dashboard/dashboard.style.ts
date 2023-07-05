import styled from "styled-components";

export const Head = styled.header<{ $style: string }>`
  padding: 1rem;
  background-color: var(--main-font-color);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  ${(props) => props.$style};

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

export const Aside = styled.aside`
  header {
    background-color: var(--main-font-color);
    padding: 10px;
    border-radius: 5px;
  }

  p {
    color: var(--body-color);
    text-align: end;
    padding-right: 10px;
    font-weight: bold;
  }
`;

export const List = styled.ul<{ $style: string }>`
  gap: 1rem;
  margin-top: 1rem;
  ${(props) => props.$style};
  height: 70vh;
  overflow: scroll;

  &input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
