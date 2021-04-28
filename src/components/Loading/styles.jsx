import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(${(props) => (props.scale ? props.scale : 0.5)});

  &:before {
    content: "";
    width: 2px;
    height: 2px;
    border-radius: 50%;
    position: absolute;
    background-color: hsl(90, 100%, 50%);
    -webkit-animation: testAnimacion 1.25s ease-in-out infinite
      alternate-reverse;
    animation: testAnimacion 1.25s ease-in-out infinite alternate-reverse;
  }
`;
