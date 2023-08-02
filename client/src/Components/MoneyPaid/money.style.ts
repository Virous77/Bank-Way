import { styled } from "styled-components";
export const PayHeader = styled.div<{ $style: string }>`
  ${(props) => props.$style};

  button {
    background-color: var(--main-font-color);
    color: var(--body-color);
    padding: 6px 20px;
    border-radius: 5px;
    transition: all 300ms ease-in-out;

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

      &:hover {
        background-color: var(--body-color);
        color: var(--main-font-color);
      }
    }
  }
`;
