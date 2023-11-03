import styled from "styled-components";

export const MAIN = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--body-color);
  z-index: 9999999;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    height: 80vh;

    p {
      margin-top: 5px;
      font-size: 13px;
    }
  }
`;
