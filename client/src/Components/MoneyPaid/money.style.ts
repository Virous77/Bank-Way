import { styled } from "styled-components";
export const PayHeader = styled.div<{ $style: string }>`
  ${(props) => props.$style};

  button {
    background-color: var(--main-font-color);
    color: var(--body-color);
    padding: 6px 20px;
    border-radius: 5px;
    transition: all 300ms ease-in-out;
    background-color: #47a992;
    color: var(--exact-white-color);

    &:hover {
      opacity: 0.9;
      scale: 1.02;
    }
  }
`;

export const PDiv = styled.div<{ $style: string }>`
  form {
    margin-top: 1rem;
    width: 100%;
    ${(props) => props.$style};
    gap: 1rem;

    fieldset {
      border: none;
      ${(props) => props.$style};
      gap: 5px;

      label {
        color: var(--body-color) !important;
        font-weight: 600;
      }
    }

    input {
      padding: 7px 10px;
      outline: none;
      border-radius: 5px;
      color: var(--body-color) !important;
      font-size: 16px;
    }

    button {
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 1rem;
      transition: all 300ms ease-in-out;
      color: var(--exact-font-color);

      &:hover {
        background-color: var(--body-color);
        color: var(--main-font-color);
      }
    }
  }
`;

export const Main = styled.main<{ $style: string }>`
  ${(props) => props.$style};
  gap: 1rem;
  background-color: var(--main-font-color);
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  padding: 10px;
`;

export const PList = styled.div<{ $isDone: string }>`
  background-color: var(--body-color);
  padding: 5px 10px;
  border-radius: 10px;
  border-left: ${(props) =>
    props.$isDone === "true" ? "8px solid green" : ""};
`;

export const PAction = styled.div<{ $style: string }>`
  padding-top: 6px;
  border-top: 1px solid var(--main-font-color);
  ${(props) => props.$style};
  margin-top: 8px;

  p {
    color: green;
    font-size: 15px;
  }

  div {
    ${(props) => props.$style};
    gap: 20px;
  }

  button {
    background-color: red;
    padding: 3px 10px;
    font-size: 14px;
    color: var(--exact-white-color) !important;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Wrap = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  cursor: pointer;

  b {
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: capitalize;
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    margin-left: 4px;
  }
`;

export const PSide = styled.div`
  h2 {
    color: var(--exact-font-color);
    font-size: 20px;
  }
`;

export const WrapD = styled.div<{ $style: string }>`
  ${(props) => props.$style};
  gap: 1rem;
  margin-top: 1rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--box-shadow);
    padding: 10px 5px;
  }

  p {
    color: var(--exact-font-color) !important;
  }

  b {
    color: var(--exact-font-color) !important;
    text-transform: capitalize;
  }

  h3 {
    color: var(--exact-font-color) !important;
  }
`;

export const SDiv = styled.div`
  flex-direction: column !important;
  align-items: flex-start !important;

  @media (max-width: 992px) {
    flex-direction: row !important;
    align-items: center !important;
  }

  @media (max-width: 540px) {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
`;
