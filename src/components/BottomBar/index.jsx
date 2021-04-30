import { Container, TabButton } from "./styles";
import { Link } from "react-router-dom";

import homeIcon from "../../assets/anotherHomeIcon.png";
import profileIcon from "../../assets/profileIcon.png";

import { useAuth } from "../../contexts/auth";

const BottomBar = () => {
  const { user } = useAuth();

  return (
    <Container>
      <TabButton>
        <Link to="/">
          <img src={homeIcon} alt="Home Tab" />
        </Link>
      </TabButton>
      <TabButton>
        <Link to={`${user ? `/me/${user._id}` : "auth/1"}`}>
          <img src={profileIcon} alt="Profile Tab" />
        </Link>
      </TabButton>
    </Container>
  );
};

export default BottomBar;
