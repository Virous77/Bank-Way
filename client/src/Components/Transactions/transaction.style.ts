import styled from "styled-components";

export const LI = styled.li<{ $style: string }>`
  padding: 10px;
  border-radius: 5px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  border-left: 2px solid
    ${(props) => (props.$style === "expense" ? "red" : "green")};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);

  h4 {
    color: var(--body-color) !important;
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
      color: var(--body-color) !important;
      font-size: 17px;
    }

    span {
      font-size: 14px;
      display: inline-block;
      margin-top: 4px;
      color: var(--body-color) !important;
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
    color: var(--body-color);

    &:hover {
      background-color: var(--body-color);
      color: var(--main-font-color);
    }
  }
`;
