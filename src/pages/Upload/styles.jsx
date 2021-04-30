import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  label img {
    margin-top: 50%;
    width: 150px;
  }

  label {
    font-size: 1.5rem;
    margin: 50px;
  }

  textarea {
    padding: 10px;
    font-size: 1rem;
    width: 90%;
    height: 25vh !important;
    max-height: 31.75vh;
    resize: vertical;
    border: 5px solid;
    border-image: linear-gradient(to right, red, orange, yellow, purple) 1;
  }

  button {
    width: 90%;
    height: 4rem;
    margin: 25px;
    margin-bottom: 75px;
    background: linear-gradient(to right, red, purple, blue);
    border-radius: 5px;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0 0 1px black;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
      filter: brightness(1.5);
    }
  }

  .overAll {
    width: 100vw;
    height: calc(100vh - 9rem);
    position: fixed;
    top: 4rem;
    background: rgba(255, 255, 255, 0.75);
  }

  .videoPreview {
    width: auto;
    height: auto;
    position: relative;

    img {
      position: absolute;
      width: 4rem;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      filter: brightness(0.85);

      transition: 0.1s ease;
      cursor: pointer;

      &:hover {
        filter: brightness(0.5);
      }
    }
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  padding: 15px;
  min-height: 0%;
  height: 1%;
  max-height: 35%;
  border: 5px solid;
  object-fit: contain;
  object-position: bottom bottom;
  border-image: linear-gradient(to right, red, green, blue, purple) 1;
`;

export const PreviewVideo = styled.video`
  width: 100%;
  padding: 15px;
  min-height: 0%;
  height: 1%;
  max-height: 35%;
  border: 5px solid;
  object-fit: contain;
  object-position: bottom bottom;
  border-image: linear-gradient(to right, red, green, blue, purple) 1;
`;
