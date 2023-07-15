import styled from "styled-components";

export const Aside = styled.aside<{ $style: string }>`
  background-color: var(--card-color);
  height: fit-content;
  padding: 1rem;
  border-radius: 10px;
  position: sticky;
  top: 11%;

  @media (max-width: 992px) {
    position: ${(props) =>
      props.$style === "/transaction" ? "unset" : "sticky"} !important;
  }
`;
