import styled from "styled-components";

export const LI = styled.li<{ $style: string }>`
  padding: 10px;
  border-radius: 5px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  border-left: 2px solid
    ${(props) =>
      props.$style === "expense"
        ? "red"
        : props.$style === "refund"
        ? "yellow"
        : "green"};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);

  h4 {
    color: var(--body-color) !important;
    color: var(--exact-font-color) !important;
  }

  &:hover {
    background-color: var(--exact-white-color);
  }
`;

export const LiWrap = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 10px;
  align-items: flex-start;
`;

export const ParentIconDiv = styled.div<{ $style: string }>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  ${(props) => props.$style};
  background-color: var(--body-color) !important;
  color: var(--main-font-color);

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
  }
`;

export const SvgDiv = styled.div`
  display: flex;
`;

export const TDiv = styled.div<{ $style: string }>`
  ${(props) => props.$style};

  div {
    display: flex;
    flex-direction: column;

    b {
      text-transform: capitalize;
      font-size: 17px;
      color: var(--exact-font-color) !important;
    }

    span {
      font-size: 14px;
      display: inline-block;
      margin-top: 4px;
      color: var(--exact-font-color) !important;
    }
  }
`;

export const TDetails = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  padding-top: 8px;

  span {
    color: var(--body-color) !important;
    display: block;
    font-size: 14px;
    margin-top: 3px;
    color: var(--exact-font-color) !important;
  }

  button {
    width: 25px;
    height: 25px;
    background-color: transparent;
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 30px;
    color: var(--exact-font-color) !important;

    &:hover {
      background-color: var(--exact-font-color);
      color: var(--exact-white-color) !important;
    }
  }
`;

export const Main = styled.main<{ $style: string }>`
  h2 {
    border-bottom: 2px solid var(--main-font-color);
    width: fit-content;
    padding-bottom: 3px;
  }

  section {
    margin-top: 1rem;
  }

  header {
    ${(props) => props.$style};

    select {
      width: 120px;
      outline: none;
      padding: 5px;
      font-weight: 500;
      font-size: 16px;
      border-radius: 5px;
      border: none;
      background-color: var(--main-font-color);
      color: var(--body-color);
    }
  }
`;

export const PUL = styled.div<{ $style: string }>`
  background-color: var(--card-color);
  padding: 10px;
  border-radius: 10px;
  gap: 1rem;
  ${(props) => props.$style};
`;

export const Aside = styled.aside<{ $style: string }>`
  header {
    background-color: var(--exact-white-color);
    border-radius: 5px;
    ${(props) => props.$style};
    padding: 0 10px;

    input {
      padding: 10px;
      padding-left: 5px;
      color: var(--exact-font-color);
      background-color: transparent;
    }
  }

  section {
    margin-top: 10px;
    h3 {
      color: var(--exact-font-color);
      padding-bottom: 3px;
      border-bottom: 2px solid var(--exact-font-color);
      width: fit-content;
      margin: auto;
      margin-bottom: 10px;
    }
  }
`;

export const Card = styled.div`
  padding: 10px;
  box-shadow: var(--box-shadow);
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 300ms ease-in-out;

  &:hover {
    scale: 1.05;
  }
`;

export const NDiv = styled.div`
  box-shadow: var(--box-shadow);
  padding: 10px 2rem;
  border-radius: 10px;
  width: 60%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 10px;

  p {
    font-size: 12px;
    text-align: center;
    margin-top: 4px;
    color: var(--main-font-color);
  }
`;

export const FButton = styled.button<{ $style: string }>`
  background-color: transparent;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  font-size: 1.2rem;
  ${(props) => props.$style};
  color: var(--exact-font-color);
  padding: 2px;

  &:hover {
    background-color: var(--exact-font-color);
    color: var(--exact-white-color);
  }
`;

export const FilterDiv = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  justify-content: space-between;
  padding: 5px 0;

  select {
    padding: 3px 7px;
    outline: none;
    border: none;
    font-size: 14px;
    color: var(--exact-font-color);
    border-radius: 3px;
  }

  p {
    color: var(--exact-font-color);
    font-size: 15px;
  }
`;
