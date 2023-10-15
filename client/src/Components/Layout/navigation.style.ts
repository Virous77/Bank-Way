import styled from "styled-components";

export const Main = styled.div<{ $style: string }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: var(--main-font-color);
  padding: 10px 20px;
  display: none;
  padding-bottom: 28px;

  @media (max-width: 992px) {
    display: block;
  }
`;

export const List = styled.ul<{ $style: string }>`
  ${(props) => props.$style};

  li {
    padding: 10px;
    border-radius: 100px;
    ${(props) => props.$style};
    cursor: pointer;

    svg {
      color: var(--body-color);
      font-size: 30px;
    }

    &:hover {
      background-color: var(--body-color);

      svg {
        color: var(--main-font-color);
        font-size: 32px;
      }
    }
  }
`;

export const ListItem = styled.li<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? "var(--card-color);" : "")};
  border-radius: ${(props) => (props.$active ? "30px" : "0px")};
  height: ${(props) => (props.$active ? "45px" : "43px")};
  width: ${(props) => (props.$active ? "45px" : "43px")};
`;
