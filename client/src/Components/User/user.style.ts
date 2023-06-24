import styled from "styled-components";

export const Main = styled.main`
  margin-top: 1.5rem;
`;

export const Header = styled.header<{ $style: string }>`
  ${(props) => props.$style};
  margin-bottom: 1.5rem;
`;

export const ProfileWrap = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
`;

export const H1 = styled.h1``;

export const ProfileSection = styled.section`
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  height: fit-content;
`;

export const UserImage = styled.div``;

export const UserInformation = styled.div``;

export const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;

export const P = styled.p`
  margin-top: 10px;
`;
