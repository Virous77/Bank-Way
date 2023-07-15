import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);

    @media (max-width: 768px) {
      width: 100%;
    }

    img {
      width: 100%;
      height: 250px;
    }

    h2 {
      text-align: center;
      margin-top: 5px;
    }

    p {
      text-align: center;
      font-size: 13px;
      margin-top: 3px;
    }

    button {
      background-color: var(--main-font-color);
      color: var(--body-color);
      padding: 7px 20px;

      border-radius: 5px;
      margin-top: 1.5rem;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;
