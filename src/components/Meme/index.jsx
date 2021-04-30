import { useState } from "react";
import { Container, MemeDescription, MemeMedia, MemeUser } from "./styles";
import { Link } from "react-router-dom";
import Loading from "../Loading";

import downloadIcon from "../../assets/download.png";
import templateMeme from "../../assets/template_meme.jpg";
import templateUser from "../../assets/user.png";

import mutedIcon from "../../assets/muted.png";
import unmutedIcon from "../../assets/unmuted.png";
import playIcon from "../../assets/playVideo.png";

const downloadStyles = {
  position: "absolute",
  right: 0,
};

const muteStyles = {
  position: "absolute",
  right: 0,
  marginRight: 85,
};

const Meme = (props) => {
  const [muted, setMuted] = useState(props.isVideoFirst);
  const [loading, setLoading] = useState(true);
  const [userImageLoading, setUserImageLoading] = useState(true);
  const [isPlayShowed, setIsPlayShowed] = useState(false);

  const downloadFile = () => {
    fetch({
      url: props.filename,
      method: "get",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", props.filename.split("/")[3]);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const playAndPause = () => {
    const video = document.querySelector("#video-element");
    if (video.paused) {
      setIsPlayShowed(false);
      return video.play();
    }

    setIsPlayShowed(true);
    return video.pause();
  };

  return (
    <Container>
      <Link to={`/profile/${props.userId}`}>
        <MemeUser>
          <img
            src={props.userImg ? props.userImg : templateUser}
            alt={props.user}
            style={{ display: userImageLoading ? "none" : "initial" }}
            onLoad={() => {
              setUserImageLoading(false);
            }}
          />
          {userImageLoading && (
            <Loading style={{ margin: "0px 31px" }} scale={0.25} />
          )}
          <b>{props.user}</b>
        </MemeUser>
      </Link>
      {props.isMemePage ? (
        <MemeMedia onClick={playAndPause}>
          {props.isVideo ? (
            <span className="videoContainer">
              <video
                onCanPlay={() => {
                  setLoading(false);
                }}
                id="video-element"
                loop={true}
                autoPlay="0"
                muted={muted}
                style={{ display: !loading ? "initial" : "none" }}
                playsInline
              >
                <source src={props.filename ? props.filename : templateMeme} />
                Your browser does not support the video tag.
              </video>
            </span>
          ) : (
            <img
              src={props.filename ? props.filename : templateMeme}
              alt={props.user}
              style={{ display: !loading ? "initial" : "none" }}
              onLoad={() => {
                setLoading(false);
              }}
            />
          )}

          {loading && <Loading />}
          {isPlayShowed && (
            <img src={playIcon} alt="Play" className="bigPlay" />
          )}
        </MemeMedia>
      ) : (
        <Link to={`/meme/${props.memeId}`}>
          <MemeMedia>
            {props.isVideo ? (
              <span className="videoContainer">
                <video
                  onCanPlay={() => {
                    setLoading(false);
                  }}
                  loop={true}
                  autoPlay="0"
                  muted={muted}
                  style={{ display: !loading ? "initial" : "none" }}
                  playsInline
                >
                  <source
                    src={props.filename ? props.filename : templateMeme}
                  />
                  Your browser does not support the video tag.
                </video>
                <img src={playIcon} alt="Play" />
              </span>
            ) : (
              <img
                src={props.filename ? props.filename : templateMeme}
                alt={props.user}
                style={{ display: !loading ? "initial" : "none" }}
                onLoad={() => {
                  setLoading(false);
                }}
              />
            )}

            {loading && <Loading />}
          </MemeMedia>
        </Link>
      )}
      <MemeDescription>
        {props.isMemePage ? (
          <article>{props.description}</article>
        ) : (
          <p>{props.description}</p>
        )}
        <div id="controls">
          {props.isVideo && (
            <div
              onClick={() => {
                setMuted(!muted);
              }}
              style={{ marginRight: "-25px" }}
            >
              <img
                src={muted ? mutedIcon : unmutedIcon}
                alt="Mute/Unmute icon"
                style={props.isMemePage && muteStyles}
              />
            </div>
          )}
          <div onClick={downloadFile}>
            <img
              src={downloadIcon}
              alt="Download Icon"
              style={props.isMemePage && downloadStyles}
            />
          </div>
        </div>
      </MemeDescription>
    </Container>
  );
};

export default Meme;
