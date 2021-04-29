import React, { useState, useEffect } from "react";

import Meme from "../../components/Meme";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroller";

import { Container, LoadingMemes } from "./styles";

import { api } from "../../services/api";

const Home = () => {
  const [memesS, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(2);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getMemes();
  }, []);

  async function getMemes(page) {
    setFetching(true);
    const {
      data: { memes, pages },
    } = await await api({
      url: "/memes/all",
      method: "get",
      params: {
        page,
      },
    });
    setMemes([...memesS, ...memes]);
    setFetching(false);
    setLoading(false);
    return pages;
  }

  return loading ? (
    <Loading center />
  ) : (
    <Container>
      <InfiniteScroll
        style={{
          height: "100%",
        }}
        loadMore={async (page) => {
          setCurrentPage(currentPage + 1);
          const pages = await getMemes(page);
          setMaxPages(Math.ceil(pages));
        }}
        pageStart={1}
        hasMore={currentPage < maxPages ? true : false}
        useWindow={false}
      >
        {memesS.map((meme) => {
          return (
            <Meme
              key={Math.random() * 10 * 1000}
              memeId={meme._id}
              userId={meme.id_user}
              userImg={meme.userImg}
              user={meme.user}
              filename={meme.src}
              description={meme.description}
            />
          );
        })}
      </InfiniteScroll>
      {fetching && (
        <LoadingMemes key={Math.random() * 10 * 10000}>
          Carregando...
        </LoadingMemes>
      )}
    </Container>
  );
};

export default Home;
