import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding-top: 25px;

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
`;

export const MemeLink = styled.div`
  background: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: calc(100vw / 3.3);
  height: calc(100vw / 3.3);
  margin: 5px;
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
