import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 25px;
  }

  input,
  button,
  label {
    margin: 12.5px;
  }

  input {
    padding: 12.5px;
    width: 65%;
    font-size: 1.25rem;
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
  }

  h1 {
    font-size: 72px;
    background: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      purple
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    margin-top: 10px;
  }

  label {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.75);
    align-self: flex-start;
    margin-left: 2rem;
  }

  button {
    background: limegreen;
    background: linear-gradient(to right, red, purple);
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    transition: 0.1s ease;
    cursor: pointer;

    &:hover {
      filter: brightness(0.75);
    }

    img {
      width: 35%;
    }
  }
`;

export const RegisterForm = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input,
  button,
  label {
    margin: 15px;
  }

  input {
    padding: 10px;
    width: 50%;
    font-size: 1.25rem;
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
  }

  div {
    display: flex;

    input {
      width: 45%;
    }
  }

  span {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  h1 {
    font-size: 50px;
    background: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      blue,
      purple
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 25px;
  }

  label {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.75);
    align-self: flex-start;
    margin-left: 1.75rem;
  }

  button {
    background: limegreen;
    background: linear-gradient(to right, red, purple);
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    transition: 0.1s ease;
    cursor: pointer;

    &:hover {
      filter: brightness(0.75);
    }

    img {
      width: 35%;
    }
  }

  span label img {
    margin: 0 20px 0 0;
    width: 150px;
  }
`;
