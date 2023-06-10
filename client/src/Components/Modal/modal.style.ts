import { styled } from "styled-components";
import "../Common/variable.scss";

export const Main = styled.main`
  background-color: rgba(17, 17, 17, 0.4);
  position: fixed;
  z-index: 121;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
`;

export const ModalContent = styled.main<{ $modalSize?: string }>`
  width: ${(props) => (props.$modalSize ? props.$modalSize : "700px")};
  background-color: var(--modal-color);
  min-height: fit-content;
  padding: 2rem;
  border-radius: 10px;
  overflow-y: scroll;
  z-index: 200;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  @media (max-width: 768px) {
    width: 97%;
    padding: 2rem 1rem;
  }
`;

export const ModalHead = styled.header`
  display: flex;
  align-item: center;
  justify-content: space-between;
`;

export const MediumHeading = styled.h2`
  font-weight: 500;
  font-size: var(--secondary-font-size);
  color: var(--main-font-color);
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-font-color);

  &:hover {
    background-color: var(--card-color);
  }
`;
