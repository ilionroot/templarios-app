import { useState, useEffect } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { Container } from "./styles";

import User from "../../components/User";
import backIcon from "../../assets/backIcon.png";
import Loading from "../../components/Loading";

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

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await api.get(`/user/${userId}`);

      setProfile(user);
      setLoading(false);
    })();
  }, [userId]);

  return loading ? (
    <Loading />
  ) : localStorage.getItem("$sex_user") ? (
    <Container>
      <User
        user={profile}
        isCurrentUser={
          JSON.parse(localStorage.getItem("$sex_user"))._id === userId
            ? true
            : false
        }
      />
      <img
        style={backStyles}
        alt="Back Icon"
        src={backIcon}
        onClick={history.goBack}
      />
    </Container>
  ) : (
    <Redirect to="/auth/1" />
  );
};

export default Profile;
