import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 65%;
  position: relative;
`;

export const MemeUser = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  margin-top: 0.625rem;
  text-decoration: none;
  color: black;

  img {
    width: 2.5rem;
    height: 2.5rem;
    margin: 15px;
    margin-top: 1.8rem;
    object-fit: cover;
    margin-bottom: 25px;
    border-radius: 50%;
  }
`;

export const MemeMedia = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 15%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MemeDescription = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;

  img {
    width: 1rem;
    margin: 0 30px 0 30px;
    cursor: pointer;
  }

  p {
    margin: 0 30px 0 15px;
    font-size: 1rem;
    width: 75%;
    white-space: nowrap;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 1) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  article {
    word-wrap: break-word;
    width: 100%;
    position: fixed;
    bottom: 5rem;
    top: calc((100vh - 9rem) - 20%);
    padding: 15px;
    overflow: auto;
    mask-image: linear-gradient(to bottom, transparent 0%, black 10%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%);
  }
`;
