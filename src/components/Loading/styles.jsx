import styled, { keyframes } from "styled-components";

const ballAuto = keyframes`
  0% {
    transform: rotate(0);
  }
  45% {
    transform: rotate(360deg);

    border-radius: 100%;
    box-shadow: 0 -20px 0 10px #de5454, 20px 0 0 10px #1ecaba,
      0 20px 0 10px #decf20, -20px 0 0 10px #2c89e8;
  }
  100% {
    transform: rotate(720deg);
  }
`;

export const Container = styled.div`
  transform: scale(${(props) => props.scale});
  position: ${({ center }) => center && "absolute"};
  top: ${({ center }) => center && "45%"};
  left: ${({ center }) => center && "50%"};
`;

export const Loader = styled.div`
  width: 8px;
  height: 8px;
  animation: ${ballAuto} 2.5s infinite linear;
  box-shadow: 0 -20px 0 -3px #de5454, 20px 0 0 -3px #1ecaba,
    0 20px 0 -3px #ffeb02, -20px 0 0 -3px #2c89e8;
`;
