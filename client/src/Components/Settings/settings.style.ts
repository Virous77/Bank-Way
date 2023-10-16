import styled from "styled-components";

export const Main = styled.main`
  padding: 1rem;
  padding-top: 0;

  h2 {
    border-bottom: 2px solid var(--main-font-color);
    width: fit-content;
    padding-bottom: 3px;
  }

  @media (max-width: 768px) {
    padding: 0;
    padding-bottom: 1rem;
  }
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

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
  position: relative;
  margin-bottom: 2.5rem;

  b {
    position: absolute;
    right: -5%;
    bottom: -20%;
    color: var(--main-font-color);
    font-size: 12px;
    font-weight: 400;

    @media (max-width: 768px) {
      right: -1%;
    }

    @media (max-width: 620px) {
      bottom: -11%;
    }
  }
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

  @media (max-width: 440px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 0;

    div {
      padding: 15px 10px;
      box-shadow: var(--box-shadow);
      width: 100%;
      border-radius: 5px;
    }
  }
`;

export const IconLi = styled.li`
  button {
    padding: 8px 0;
    border-radius: 20px;
    width: 100%;
    transition: all 300ms ease-in-out;

    &:hover {
      scale: 1.03;
    }
  }

  p {
    color: var(--exact-white-color);

    @media (max-width: 620px) {
      color: var(--exact-font-color);
      font-weight: 600;
    }
  }
`;

export const IDiv = styled.div`
  background-color: var(--body-color);
  border-radius: 30px;
  width: 160px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 5px;
`;

export const HomeUL = styled.ul<{ $style: string; $liStyle: string }>`
  ${(props) => props.$style};
  gap: 2rem;

  li {
    ${(props) => props.$liStyle};

    @media (max-width: 620px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
`;

export const IconButton = styled.button<{ $active: string }>`
  background-color: ${(props) =>
    props.$active === "true" ? "var(--main-font-color)" : "transparent"};
  color: ${(props) =>
    props.$active === "true" ? "#47A992" : "var(--main-font-color)"};
`;

export const TTDiv = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  gap: 1rem;
`;

export const CsvButton = styled.button`
  background-color: var(--body-color);
  color: var(--main-font-color) !important;
  padding: 10px 25px;
  border-radius: 4px;
  margin-top: 20px;
`;

export const CsvTab = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  margin-bottom: 20px;
  gap: 2rem;

  @media (max-width: 520px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
    width: 100%;
    gap: 1rem;

    div {
      padding: 10px;
      box-shadow: var(--box-shadow);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
    }
  }
`;
