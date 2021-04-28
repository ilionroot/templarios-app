import {
  Container,
  MemesGrid,
  MemeLink,
  ProfileInfo,
  LogOutButton,
} from "./styles";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import userImage from "../../assets/user.png";
import { Link } from "react-router-dom";

import { api } from "../../services/api";

import { useAuth } from "../../contexts/auth";

const User = ({ user, isCurrentUser }) => {
  const { signOut } = useAuth();
  const [memes, setMemes] = useState([]);

  const history = useHistory();
  const addMeme = () => {
    history.push("/upload");
  };

  useEffect(() => {
    (async () => {
      const {
        data: { memes },
      } = await api.get(`/memes/all?id=${user._id}`);

      console.log(memes);
      setMemes(memes);
    })();
  }, [user._id]);

  return (
    <Container>
      <ProfileInfo>
        <img
          src={
            user.img
              ? `${api.defaults.baseURL}/public/uploads/${user.img}`
              : userImage
          }
          alt="User"
        />
        <h1>{user.username}</h1>{" "}
        {isCurrentUser && (
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
      <h2>
        Memes <b onClick={addMeme}>+</b>
      </h2>
      <MemesGrid>
        {memes.map((meme) => {
          return (
            <Link key={meme._id} to={`/meme/${meme._id}`}>
              <MemeLink
                url={`${api.defaults.baseURL}/public/uploads/${meme.src}`}
              />
            </Link>
          );
        })}
      </MemesGrid>
    </Container>
  );
};

export default User;
