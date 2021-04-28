import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 4rem;
  background-image: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    purple
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px -10px black;
  position: fixed;
  top: 0;

  img {
    width: 5rem;
  }
`;
