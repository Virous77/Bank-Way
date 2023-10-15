import { styled } from "styled-components";

export const Main = styled.main<{ $style: string }>`
  margin-top: 4rem;
  padding: 2rem 4rem;
  display: grid;
  color: var(--body-color);
  grid-template-columns: 300px 1fr 300px;
  gap: 1rem;
  margin-bottom: 3.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    display: ${(props) => (props.$style === "/transaction" ? "flex" : "grid")};
    flex-direction: ${(props) =>
      props.$style === "/transaction" ? "column-reverse" : "column"};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Aside = styled.aside<{ $style: string; $styles: string }>`
  padding: 1rem;
  background-color: var(--card-color);
  border-radius: 10px;
  height: 80vh;
  position: sticky;
  top: 11%;

  div {
    ${(props) => props.$styles};
    align-items: flex-start;
    display: none;

    button {
      background-color: transparent;
      font-size: 20px;
      color: var(--exact-font-color);
      margin-top: 3px;
      padding-right: 5px;
    }
  }

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    z-index: 1000000;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    height: 100vh;
    display: ${(props) => (props.$style === "yes" ? "block" : "none")};

    h1 {
      margin-bottom: 1rem;
      padding-left: 3px;
    }

    div {
      display: flex;
    }
  }

  @media (max-width: 768px) {
    width: 70%;
  }
`;

export const List = styled.ul<{ $style?: string }>`
  ${(props) => props.$style};
  gap: 8px;
`;

export const Item = styled.li<{ $style?: string; $active?: boolean }>`
  ${(props) => props.$style};
  gap: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 6px 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$active ? "var(--main-font-color);" : ""};
  border-radius: ${(props) => (props.$active ? "30px" : "0px")};

  &:hover {
    background-color: var(--main-font-color);
    border-radius: 30px;
  }
`;

export const SAuthB = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 13px;
    padding-left: 3px;
    margin-left: 5px;
    color: var(--exact-font-color) !important;
    font-weight: 600;
  }
`;
