import React, { useState, useEffect } from "react";

import Meme from "../../components/Meme";
import Loading from "../../components/Loading";

import { Container } from "./styles";

import { api } from "../../services/api";

const Home = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMemes().then(() => setLoading(false));

    setInterval(() => {
      getMemes();
    }, 10000);
  }, []);

  const getMemes = async () => {
    setMemes(await (await api.get("/memes/all")).data.memes);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      {memes.map((meme) => {
        return (
          <Meme
            key={meme._id}
            memeId={meme._id}
            userId={meme.id_user}
            userImg={meme.userImg}
            user={meme.user}
            filename={meme.src}
            description={meme.description}
          />
        );
      })}
    </Container>
  );
};

export default Home;
