import { createContext, useContext, useState, useEffect } from "react";
import * as auth from "../services/auth";
import { api } from "../services/api";

// import Loading from "../components/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadStoragedData() {
      if (
        !!localStorage.getItem("$sex_token") &&
        !!localStorage.getItem("$sex_user")
      ) {
        api.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "$sex_token"
        )}`;
        setUser(JSON.parse(localStorage.getItem("$sex_user")));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(e, username, password) {
    const {
      data: { token, user },
    } = await auth.signIn(e, username, password);
    setUser(user);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    localStorage.setItem("$sex_token", token);
    localStorage.setItem("$sex_user", JSON.stringify(user));
  }

  async function signUp(e, username, password, cpassword, email) {
    const {
      data: { token, user },
    } = await auth.signUp(e, username, password, cpassword, email);
    setUser(user);
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    localStorage.setItem("$sex_token", token);
    localStorage.setItem("$sex_user", JSON.stringify(user));
  }

  function signOut() {
    localStorage.clear();
    api.defaults.headers["Authorization"] = ``;
    setUser(null);
  }

  // if (loading) {
  //   return <Loading scale={0.5} />;
  // }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
