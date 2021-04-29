import { useState, useEffect } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import {
  Container,
  MemesGrid,
  MemeLink,
  ProfileInfo,
  LogOutButton,
} from "./styles";

import backIcon from "../../assets/backIcon.png";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/auth";

import userImage from "../../assets/user.png";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingMemes } from "../../pages/Home/styles";

import { api } from "../../services/api";

const backStyles = {
  position: "fixed",
  top: "0.25rem",
  left: "0.5rem",
  color: "black",
  width: "3.5rem",
  cursor: "pointer",
};

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { userId } = useParams();
  const { user, signOut } = useAuth();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await api.get(`/user/${userId}`);
      getMemes();

      setProfile(user);
      setLoading(false);
    })();
  }, [userId]);

  const [memesS, setMemes] = useState([]);

  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(2);
  const [fetching, setFetching] = useState(false);

  const addMeme = () => {
    history.push("/upload");
  };

  async function getMemes(page) {
    setFetching(true);
    const {
      data: { memes, pages },
    } = await api({
      url: `/memes/all?id=${userId}`,
      method: "get",
      params: {
        page: page ? page : 1,
      },
    });

    setMemes([...memesS, ...memes]);
    setFetching(false);
    return pages;
  }

  useEffect(() => {
    (async () => {
      if (page !== 1) {
        const pages = await getMemes(page);
        setMaxPages(Math.ceil(pages));
      }
    })();
  }, [page]);

  return loading ? (
    <Loading center />
  ) : user ? (
    <Container
      id="scrollableDiv"
      // onScroll={(e) => console.log($(e.target).scrollTop())}
      // ref={(ref) => setScrollParentRef(ref)}
    >
      <ProfileInfo>
        <img src={profile.img ? profile.img : userImage} alt="User" />
        <h1>{profile.username || "Username"}</h1>{" "}
        {profile._id === userId && (
          <LogOutButton
            onClick={() => {
              signOut();
              history.push("/auth/1");
            }}
          >
            Sair
          </LogOutButton>
        )}
      </ProfileInfo>
      {profile._id === userId && (
        <h2>
          Memes <b onClick={addMeme}>+</b>
        </h2>
      )}

      <InfiniteScroll
        dataLength={memesS.length}
        next={async () => {
          setPage(page + 1);
        }}
        hasMore={page < maxPages ? true : false}
        scrollableTarget="scrollableDiv"
        style={{
          height: "100%",
        }}
      >
        <MemesGrid>
          {memesS.map((meme) => {
            return (
              <Link key={meme._id} to={`/meme/${meme._id}`}>
                <MemeLink url={meme.src} />
              </Link>
            );
          })}
        </MemesGrid>
      </InfiniteScroll>

      {fetching && (
        <LoadingMemes key={Math.random() * 23 * 10000}>
          Carregando...
        </LoadingMemes>
      )}
      <img
        style={backStyles}
        alt="Back Icon"
        src={backIcon}
        onClick={history.goBack}
      />
      {fetching && (
        <LoadingMemes key={Math.random() * 10 * 10000}>
          Carregando...
        </LoadingMemes>
      )}
    </Container>
  ) : (
    <Redirect to="/auth/1" />
  );
};

export default Profile;
