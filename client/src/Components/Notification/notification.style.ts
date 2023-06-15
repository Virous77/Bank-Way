import styled from "styled-components";

export const Main = styled.div<{ $style?: string }>`
  position: fixed;
  right: 2%;
  z-index: 1000000000000000;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 12px 14px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  border-radius: 10px;
  bottom: -100px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  color: black;
  ${(props) => (props.$style ? props.$style : "")};
`;

export const success = `
border-left: 5px solid green;
bottom: 20px;
opacity: 1;
`;

export const error = `
border-left: 5px solid red;
bottom: 20px;
opacity: 1;
`;
