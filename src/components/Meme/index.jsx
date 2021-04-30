import { useState } from "react";
import { Container, MemeDescription, MemeMedia, MemeUser } from "./styles";
import { Link, useHistory } from "react-router-dom";
import Loading from "../Loading";

import downloadIcon from "../../assets/download.png";
import templateMeme from "../../assets/template_meme.jpg";
import templateUser from "../../assets/user.png";

import mutedIcon from "../../assets/muted.png";
import unmutedIcon from "../../assets/unmuted.png";
import playIcon from "../../assets/playVideo.png";
import shareIcon from "../../assets/shareIcon.png";

import axios from "axios";

const downloadStyles = {
  position: "absolute",
  right: 0,
};

const muteStyles = {
  position: "absolute",
  right: 0,
  marginRight: 140,
};

const shareStyles = {
  position: "absolute",
  right: 0,
  marginRight: 85,
};

const Meme = (props) => {
  const [muted, setMuted] = useState(props.isVideoFirst | props.isVideoSecond);
  const [loading, setLoading] = useState(true);
  const [userImageLoading, setUserImageLoading] = useState(true);
  const [isPlayShowed, setIsPlayShowed] = useState(true);

  const downloadFile = () => {
    axios({
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

  const shareMeme = async () => {
    const shareData = {
      title: "Sex Memes",
      text: "Olha esse meme que engraçadinhoKKK🤣️😂️😏️",
      url: `${window.location.href}meme/${props.memeId}`,
    };

    await navigator.share(shareData);
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
                muted={muted}
                style={{
                  display: !loading ? "initial" : "none",
                  width: "100%",
                  height: "100%",
                }}
                playsInline
                autoPlay={false}
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
          {isPlayShowed && (
            <img src={playIcon} alt="Play" className="bigPlay" />
          )}
          {loading && <Loading />}
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
                  autoPlay={props.isVideoFirst}
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
                alt="Mute/Unmute"
                style={props.isMemePage && muteStyles}
              />
            </div>
          )}
          <div onClick={shareMeme}>
            <img
              src={shareIcon}
              alt="Share"
              style={props.isMemePage && shareStyles}
            />
          </div>
          <div onClick={downloadFile}>
            <img
              src={downloadIcon}
              alt="Download"
              style={props.isMemePage ? downloadStyles : { marginLeft: 15 }}
            />
          </div>
        </div>
      </MemeDescription>
    </Container>
  );
};

export default Meme;
