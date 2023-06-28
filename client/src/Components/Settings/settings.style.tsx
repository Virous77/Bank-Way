import styled from "styled-components";

export const Main = styled.main`
  padding: 1rem;
  padding-top: 0;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  gap: 2rem;

  span {
    font-size: 12px;
    display: inline-block;
    margin-top: 5px;
    color: var(--secondary-font-color) !important;
  }
`;

export const List = styled.div`
  padding: 1rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  width: 100%;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    scale: 1.03;
    border: 2px solid var(--main-font-color);
  }
`;

export const Section = styled.section`
  margin-top: 1rem;
`;

export const FieldSet = styled.fieldset`
  border: none;

  label {
    display: inline-block;
    margin-bottom: 6px;
    font-size: 15px;
    font-weight: 600;
  }
`;

export const Check = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  gap: 10px;

  span {
    color: var(--exact-white-color) !important;
  }

  p {
    width: 22px;
    height: 22px;
    color: var(--exact-white-color) !important;
    border: 2px solid var(--exact-white-color) !important;
    ${(props) => props.$style};
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const CheckList = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  gap: 3rem;
  margin-top: 2rem;
`;