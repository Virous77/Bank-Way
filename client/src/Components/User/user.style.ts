import styled from "styled-components";

export const Main = styled.main`
  margin-top: 1.5rem;
`;

export const Header = styled.header<{ $style: string }>`
  ${(props) => props.$style};
  margin-bottom: 1.5rem;

  h1 {
    border-bottom: 2px solid var(--main-font-color);
    width: fit-content;
    padding-bottom: 3px;
  }
`;

export const ProfileWrap = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const ProfileSection = styled.section`
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  height: fit-content;
`;

export const UserInformation = styled.div`
  h2 {
    font-size: 26px;
  }
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;

export const P = styled.p`
  margin-top: 10px;
`;

export const Form = styled.form<{ $style: string }>`
  width: 100%;
  ${(props) => props.$style};
  gap: 1rem;
`;

export const Wrap = styled.div`
  position: relative;
  width: fit-content;
  margin-bottom: 1rem;
`;

export const Label = styled.label<{ $style: string }>`
  position: absolute;
  bottom: -22%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  background-color: var(--main-font-color);
  color: var(--body-color);
  ${(props) => props.$style};
  border-radius: 100%;
  cursor: pointer;

  &:hover {
    background-color: var(--body-color);
    color: var(--main-font-color);
  }
`;
