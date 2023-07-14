import styled from "styled-components";

export const Head = styled.header<{ $style: string }>`
  padding: 1rem;
  background-color: var(--main-font-color);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  ${(props) => props.$style};

  @media (max-width: 660px) {
    flex-direction: column;
    gap: 13px;
  }

  div {
    display: flex;
    align-items: flex-end;
    gap: 4px;
  }

  h1 {
    color: var(--body-color);
    font-size: var(--secondary-font-size);
    white-space: nowrap;
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

  @media (max-width: 740px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const ChartBox = styled.div`
  @media (max-width: 740px) {
    width: 100%;
  }

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
  max-height: 70vh;
  min-height: fit-content;
  overflow: scroll;

  &input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const NDiv = styled.div`
  margin-top: 2rem;

  p {
    font-size: 12px;
    text-align: center;
    margin-top: 4px;
    color: var(--exact-font-color);
  }
`;

export const NLoad = styled.div<{ $style: string }>`
  margin-top: 1rem;
  ${(props) => props.$style};
`;
