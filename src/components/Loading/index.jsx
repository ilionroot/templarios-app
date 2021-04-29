import { Container, Loader } from "./styles";

const Loading = ({ scale, center, style }) => {
  return (
    <Container scale={scale} center={center} style={style}>
      <Loader id="ball-auto" />
    </Container>
  );
};

export default Loading;
