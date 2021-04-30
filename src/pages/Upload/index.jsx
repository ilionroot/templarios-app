import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, PreviewImage, PreviewVideo } from "./styles";

import addFile from "../../assets/addFile.png";
import xIcon from "../../assets/xIcon.png";
import Loading from "../../components/Loading";
import playIcon from "../../assets/playVideo.png";

import { api } from "../../services/api";

const cancellImageStyles = {
  position: "absolute",
  width: "2rem",
  top: "0.5rem",
  right: "0.5rem",
  filter: "invert()",
  background: "white",
  padding: "10px",
  borderRadius: "50%",
  opacity: "85%",
  cursor: "pointer",
};

const Upload = () => {
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [onProcess, setOnProcess] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isPlayShowed, setIsPlayShowed] = useState(true);

  const history = useHistory();

  const cancellImage = () => {
    document.getElementById("file").value = "";
    setPreview(false);
    setPreviewContent("");
  };

  const showPreview = (e) => {
    const filename = e.target.files[0].name.split(".")[
      e.target.files[0].name.split(".").length - 1
    ];
    var file = new FileReader();
    file.onload = function (k) {
      setPreview(true);
      setIsVideo(isVideoVerify(filename));
      setPreviewContent(k.target.result);
    };
    file.readAsDataURL(e.target.files[0]);
  };

  const post = async (e) => {
    setOnProcess(true);
    e.preventDefault();

    const formData = new FormData();
    const imagefile = document.querySelector("#file");

    formData.append("file", imagefile.files[0]);
    formData.append("description", description);
    formData.append("user_id", "608764ecc752879e10211ba2");

    await api
      .post("/files/upload", formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      })
      .then((response) => {
        history.push("/");
      })
      .catch((err) => {
        alert("Error: Server 500");
      });

    setOnProcess(false);
  };

  const isVideoVerify = (extension) => {
    switch (extension) {
      case "mp4":
        return true;
      case "webm":
        return true;
      case "mpeg4":
        return true;
      case "h.263":
        return true;
      case "h.264":
        return true;
      case "mov":
        return true;
      case "MOV":
        return true;
      default:
        return false;
    }
  };

  const playAndPause = () => {
    const video = document.querySelector("#video-preview");
    if (video.paused) {
      setIsPlayShowed(false);
      return video.play();
    }

    setIsPlayShowed(true);
    return video.pause();
  };

  return (
    <Container enctype="multipart/form-data" onSubmit={post}>
      {!preview ? (
        <label htmlFor="file">
          <img src={addFile} alt="Add file" />
        </label>
      ) : (
        <>
          {isVideo ? (
            <div className="videoPreview">
              <PreviewVideo onClick={playAndPause} id="video-preview" loop>
                <source src={previewContent} />
                Your browser does not support the video tag.
              </PreviewVideo>
              {isPlayShowed && (
                <img src={playIcon} alt="Play" onClick={playAndPause} />
              )}
            </div>
          ) : (
            <PreviewImage alt="Preview" src={previewContent} />
          )}
          <img
            style={cancellImageStyles}
            onClick={cancellImage}
            src={xIcon}
            alt="Cancell File"
          />
        </>
      )}
      <input
        type="file"
        required
        accept="
          image/png,image/jpg,image/jpeg,image/webp,video/mp4,video/mpeg4,video/H.263,video/H.264,video/webm,video/mov,video/MOV
        "
        onChange={showPreview}
        hidden
        name="file"
        id="file"
      />
      <label htmlFor="description">Descrição</label>
      <textarea
        maxLength={250}
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Digite uma descrição..."
        required
      ></textarea>
      {onProcess ? (
        <div className="overAll">
          <Loading center />
        </div>
      ) : (
        <button type="submit">Postar</button>
      )}
    </Container>
  );
};

export default Upload;
