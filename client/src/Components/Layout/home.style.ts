import { styled } from "styled-components";

export const Main = styled.main`
  margin-top: 4rem;
  padding: 2rem 4rem;
  display: grid;
  color: var(--body-color);
  grid-template-columns: 300px 1fr 300px;
  gap: 1rem;
`;

export const Aside = styled.aside`
  padding: 1rem;
  background-color: var(--card-color);
  border-radius: 10px;
  height: 80vh;
  position: sticky;
  top: 11%;
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
