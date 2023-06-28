import { styled } from "styled-components";

export const NavbarMain = styled.header<{ $displayCenter: string }>`
  background-color: var(--card-color);
  padding: 0.5rem 2rem;
  position: fixed;
  width: 80%;
  left: 50%;
  top: 6%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  justify-content: space-between;
  ${(props) => props.$displayCenter};

  @media (max-width: 768px) {
    width: 95%;
    padding: 0.5rem 1rem;
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  color: var(--modal-color);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const RightContainer = styled.div<{ $displayCenter: string }>`
  gap: 2rem;
  ${(props) => props.$displayCenter};

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const Circle = styled.div<{ $style: string }>`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  overflow: hidden;
  border: 2px solid var(--modal-color);
  ${(props) => props.$style};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const Theme = styled.div<{ $displayCenter: string }>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  ${(props) => props.$displayCenter};

  &:hover {
    background-color: var(--body-color);
  }
`;

export const Button = styled.button<{
  $primary?: string;
  $color?: string;
  $width?: string;
}>`
  background: ${(props) => (props.$primary ? props.$primary : "transparent")};
  font-size: 1em;
  padding: ${(props) => (props.$primary ? "8px 20px" : "0")};
  border-radius: ${(props) => (props.$primary ? "30px" : "0")};
  color: ${(props) =>
    props.$color ? props.$color : "var(--main-font-color)"} !important;
  width: ${(props) => (props.$width ? props.$width : "fit-content")}

  &:hover {
    opacity: 0.8;
  }
`;

export const Img = styled.img`
  object-fit: cover;
  height: 100%;
`;
