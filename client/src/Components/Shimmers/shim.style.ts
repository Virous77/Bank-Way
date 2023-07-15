import styled from "styled-components";

export const ShimDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  padding-top: 3rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;

  @media (max-width: 740px) {
    grid-template-columns: 1fr;
  }
`;
