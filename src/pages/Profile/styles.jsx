import styled from "styled-components";

export const Container = styled.div`
  background: snow;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden auto;

  img {
    width: 50%;
    margin-bottom: 25px;
  }

  h2 {
    margin: 25px 12.5px -4rem 12.5px;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;

    b {
      font-size: 2.5rem;
      background: linear-gradient(to right, red, purple);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      z-index: 1;
    }
  }

  .video {
    position: relative;

    video {
      width: calc(100vw / 3.3);
      height: calc(100vw / 3.3);
      margin: 5px 5px 5px 3.25px;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    img {
      width: 1rem;
      position: absolute;
      top: 0.9rem;
      right: 0.9rem;
    }
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 15px;
  img {
    width: 50vw;
    height: 50vw;
    object-fit: cover;
    margin-bottom: 25px;
    border-radius: 50%;
  }
`;

export const MemesGrid = styled.div`
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  padding: 0 5px 0 5px;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 125px;
`;

export const MemeLink = styled.div`
  background: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: calc(100vw / 3.3);
  height: calc(100vw / 3.3);
  margin: 5px 5px 9.25px 3.25px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogOutButton = styled.div`
  padding: 10px;
  width: 15%;
  font-size: 0.85rem;
  background: transparent;
  transition: 0.1s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: gray;
  }
`;
