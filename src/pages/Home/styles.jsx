import styled from "styled-components";

export const Container = styled.div`
  /* background: whitesmoke; */
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden auto;
`;

export const LoadingMemes = styled.div`
  position: fixed;
  bottom: 5rem;
  right: calc(50% - 18%);
  background: rgba(245, 245, 245, 0.75);
  width: 35%;
  height: 2.5rem;
  display: flex;
  font-size: 0.85rem;
  align-items: center;
  justify-content: center;
  border: 5px solid;
  border-image: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      purple
    )
    1;
  border-bottom: none;
`;
