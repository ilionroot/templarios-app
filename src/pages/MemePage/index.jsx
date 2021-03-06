import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Meme from "../../components/Meme";
import Loading from "../../components/Loading";

import backIcon from "../../assets/backIcon.png";

import { api } from "../../services/api";

const backStyles = {
  position: "fixed",
  top: "0.25rem",
  left: "0.5rem",
  color: "black",
  width: "3.5rem",
  cursor: "pointer",
};

const MemePage = (props) => {
  const [meme, setMeme] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  useEffect(
    (props) => {
      (async () => {
        const {
          data: { meme },
        } = await api.get(`${api.defaults.baseURL}/memes/one?id=${id}`);

        setMeme(meme);
        setLoading(false);
      })();
    },
    [id]
  );

  return loading ? (
    <Loading center />
  ) : (
    <>
      <Meme
        userImg={meme.userImg}
        userId={meme.id_user}
        user={meme.user}
        isVideo={meme.isVideo}
        filename={meme.src}
        memeId={meme._id}
        description={meme.description}
        isMemePage={true}
      />
      <img
        style={backStyles}
        alt="Back Icon"
        src={backIcon}
        onClick={() => {
          new URLSearchParams(window.location.search).get("clickedOnLink") ===
          "1"
            ? history.push("/")
            : history.goBack();
        }}
      />
    </>
  );
};

export default MemePage;
