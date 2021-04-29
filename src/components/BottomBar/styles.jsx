import styled from "styled-components";

export const Container = styled.div`
  background: red;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  box-shadow: 0 0 25px -15px black;
  z-index: 0;
`;

export const TabButton = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  background: whitesmoke;
  box-shadow: inset 0 0 22.5px -20px black;
  cursor: pointer;

  a {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }

  img {
    width: 15%;
  }
`;
