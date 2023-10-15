import styled from "styled-components";

export const Main = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    color: rgba(249, 238, 45, 0.705);
    font-size: 20px;
    text-align: center;
  }

  img {
    width: 150px;
    height: 150px;
  }

  div {
    ${(props) => props.$style};
    align-items: center;

    p {
      font-size: 13px;
      margin-top: 5px;
      text-align: center;
    }
  }
`;
