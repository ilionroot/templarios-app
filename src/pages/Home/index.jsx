import React, { useState, useEffect } from "react";

import Meme from "../../components/Meme";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroller";

import { Container, LoadingMemes } from "./styles";

import { api } from "../../services/api";
import $ from "jquery";

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

  function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  var autoPause = debounce(() => {
    $("video").each(function (i) {
      var top_of_element = $($("video")[i]).offset().top;
      var bottom_of_element =
        $($("video")[i]).offset().top + $($("video")[i]).outerHeight();
      var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      // var top_of_screen = $(window).scrollTop();

      if (
        bottom_of_screen / 3 > top_of_element &&
        bottom_of_element > bottom_of_screen / 2
      ) {
        if (this.paused) {
          this.play();
        }
      } else {
        if (!this.paused) {
          this.pause();
          this.currentTime = 0;
        }
      }
    });
  }, 25);

  return loading ? (
    <Loading center />
  ) : (
    <Container onScroll={autoPause}>
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
        {memesS.map((meme, i) => {
          return (
            <Meme
              key={Math.random() * 10 * 1000}
              memeId={meme._id}
              isVideo={meme.isVideo}
              isVideoFirst={(i === 0) | (i === 1)}
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
