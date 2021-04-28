import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, PreviewImage } from "./styles";

import addFile from "../../assets/addFile.png";
import xIcon from "../../assets/xIcon.png";

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

  const history = useHistory();

  const cancellImage = () => {
    document.getElementById("file").value = "";
    setPreview(false);
    setPreviewContent("");
  };

  const showPreview = (e) => {
    var file = new FileReader();
    file.onload = function (k) {
      setPreview(true);
      setPreviewContent(k.target.result);
    };
    file.readAsDataURL(e.target.files[0]);
  };

  const post = async (e) => {
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
      .catch((err) => alert("Error: Server 500"));
  };

  return (
    <Container enctype="multipart/form-data" onSubmit={post}>
      {!preview ? (
        <label htmlFor="file">
          <img src={addFile} alt="Add file" />
        </label>
      ) : (
        <>
          <PreviewImage alt="Preview" src={previewContent} />
          <img
            style={cancellImageStyles}
            onClick={cancellImage}
            src={xIcon}
            alt="Cancell File"
          />
        </>
      )}
      <input type="file" onChange={showPreview} hidden name="file" id="file" />
      <label htmlFor="description">Descrição</label>
      <textarea
        maxLength={250}
        name="description"
        id="description"
        cols="30"
        rows="10"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Postar</button>
    </Container>
  );
};

export default Upload;
