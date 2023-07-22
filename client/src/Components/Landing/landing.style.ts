import { styled } from "styled-components";

export const Main = styled.main<{ $style: string }>`
  margin-top: 6rem;
  padding: 1rem 4rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  section {
    max-width: 1000px;
    margin: auto;
    ${(props) => props.$style};
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (max-width: 820px) {
      max-width: 100%;
    }

    h1 {
      color: var(--main-font-color);
      font-size: 25px;

      @media (max-width: 768px) {
        text-align: center;
        font-size: 23px;
      }
    }

    img {
      width: 100%;
      height: 300px;
      margin-top: 2rem;
      margin-bottom: 10px;

      @media (max-width: 620px) {
        height: 100%;
      }
    }

    h2 {
      font-size: 20px;
      color: var(--main-font-color);

      @media (max-width: 768px) {
        text-align: center;
      }
    }

    p {
      color: var(--main-font-color);
      font-size: 14px;
      text-align: center;
      width: 80%;
      margin: auto;

      @media (max-width: 820px) {
        width: 90%;
      }
    }

    button {
      background-color: var(--main-font-color);
      color: var(--body-color);
      padding: 10px 40px;
      border-radius: 5px;
      margin-top: 1rem;

      &:hover {
        opacity: 0.9;
      }

      @media (max-width: 620px) {
        width: 100%;
        margin-top: 2rem;
        font-size: 1rem;
      }
    }
  }
`;
