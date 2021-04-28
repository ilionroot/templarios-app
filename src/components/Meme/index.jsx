import { Container, MemeDescription, MemeMedia, MemeUser } from "./styles";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import downloadIcon from "../../assets/download.png";
import templateMeme from "../../assets/template_meme.jpg";
import templateUser from "../../assets/user.png";

const downloadStyles = {
  position: "absolute",
  right: 0,
};

const Meme = (props) => {
  const downloadFile = () => {
    api({
      url: `/public/uploads/${props.filename}`,
      method: "get",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", props.filename);
        link.click();
      })
      .catch((err) => {});
  };

  return (
    <Container>
      <Link to={`/profile/${props.userId}`}>
        <MemeUser>
          <img
            src={
              props.userImg
                ? `${api.defaults.baseURL}/public/uploads/${props.userImg}`
                : templateUser
            }
            alt={props.user}
          />
          <b>{props.user}</b>
        </MemeUser>
      </Link>
      <Link to={`/meme/${props.memeId}`}>
        <MemeMedia>
          <img
            src={
              props.filename
                ? `${api.defaults.baseURL}/public/uploads/${props.filename}`
                : templateMeme
            }
            alt={props.user}
          />
        </MemeMedia>
      </Link>
      <MemeDescription>
        {props.isMemePage ? (
          <article>{props.description}</article>
        ) : (
          <p>{props.description}</p>
        )}
        <div onClick={downloadFile}>
          <img
            src={downloadIcon}
            alt="Download Icon"
            style={props.isMemePage && downloadStyles}
          />
        </div>
      </MemeDescription>
    </Container>
  );
};

export default Meme;
