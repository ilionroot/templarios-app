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

const MemePage = () => {
  const [meme, setMeme] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const {
        data: { meme },
      } = await api.get(`${api.defaults.baseURL}/memes/one?id=${id}`);

      setMeme(meme);
      setLoading(false);
    })();
  });

  return loading ? (
    <Loading />
  ) : (
    <>
      <Meme
        userImg={meme.userImg}
        userId={meme.id_user}
        user={meme.user}
        filename={meme.src}
        memeId={meme._id}
        description={meme.description}
        isMemePage={true}
      />
      <img
        style={backStyles}
        alt="Back Icon"
        src={backIcon}
        onClick={history.goBack}
      />
    </>
  );
};

export default MemePage;
