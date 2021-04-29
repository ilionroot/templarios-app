import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, LoginForm, RegisterForm } from "./styles";
import { useAuth } from "../../contexts/auth";
import Loading from "../../components/Loading";

import loginIcon from "../../assets/loginIcon.png";
import addFile from "../../assets/addFile.png";
import xIcon from "../../assets/xIcon.png";

import { PreviewImage } from "../Upload/styles";

const cancellImageStyles = {
  position: "absolute",
  width: "2rem",
  top: "6.25rem",
  right: "0.25rem",
  filter: "invert()",
  background: "white",
  padding: "10px",
  borderRadius: "50%",
  opacity: "85%",
  cursor: "pointer",
};

const Authentication = () => {
  const { signIn, signUp } = useAuth();

  const history = useHistory();
  const { isLogin } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [onProcess, setOnProcess] = useState(false);

  const showPreview = (e) => {
    var file = new FileReader();
    file.onload = function (k) {
      setPreview(true);
      setPreviewContent(k.target.result);
    };
    file.readAsDataURL(e.target.files[0]);
  };

  const cancellImage = () => {
    document.getElementById("file").value = "";
    setPreview(false);
    setPreviewContent("");
  };

  return (
    <Container>
      {Number(isLogin) ? (
        <LoginForm
          onSubmit={async (e) => {
            setOnProcess(true);
            await signIn(e, username, password)
              .then((res) => {
                history.push("/");
              })
              .catch((err) => {
                if (
                  err
                    .toString()
                    .substr(
                      err.toString().length - 3,
                      err.toString().length - 1
                    ) === "403"
                ) {
                  alert("Usuário e/ou senha incorreto(s)!");
                }
              });

            setOnProcess(false);
          }}
        >
          <h1>Entrar</h1>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            placeholder="Digite seu usuário"
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="Digite sua senha"
            required
          />

          <div id="loader">
            {onProcess ? (
              <Loading scale={0.5} />
            ) : (
              <button type="submit">
                <img src={loginIcon} alt="Login" />
              </button>
            )}
          </div>

          <Link style={{ margin: 0 }} to="/auth/0">
            Não tem uma conta? Registre-se aqui
          </Link>
        </LoginForm>
      ) : (
        <RegisterForm
          enctype="multipart/form-data"
          onSubmit={async (e) => {
            setOnProcess(true);

            await signUp(e, username, password, cpassword, email)
              .then((res) => {
                history.push("/");
              })
              .catch((err) => {
                if (
                  err
                    .toString()
                    .substr(
                      err.toString().length - 3,
                      err.toString().length - 1
                    ) === "406"
                ) {
                  alert("Erro: E-mail já cadastrado!");
                } else if (
                  err
                    .toString()
                    .substr(
                      err.toString().length - 3,
                      err.toString().length - 1
                    ) === "409"
                ) {
                  alert("Erro: Usuário já cadastrado!");
                }
              });

            setOnProcess(false);
          }}
        >
          <h1>Registrar</h1>
          <span>
            {!preview ? (
              <label htmlFor="file">
                <img src={addFile} alt="Add file" />
              </label>
            ) : (
              <>
                <PreviewImage alt="Preview" src={previewContent} />
                <img
                  style={cancellImageStyles}
                  onClick={cancellImage}
                  src={xIcon}
                  alt="Cancell File"
                />
              </>
            )}
          </span>
          <input
            type="file"
            onChange={showPreview}
            hidden
            name="file"
            id="file"
          />

          <label
            style={{ alignSelf: "center", marginLeft: 0 }}
            htmlFor="username"
          >
            Usuário:
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            placeholder="Digite seu usuário"
            required
          />
          <span>
            <label htmlFor="password">Senha:</label>
            <label htmlFor="password">Confirmar senha:</label>
          </span>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Digite sua senha"
              required
            />
            <input
              type="password"
              onChange={(e) => setCPassword(e.target.value)}
              name="cpassword"
              id="cpassword"
              placeholder="Senha novamente"
              required
            />
          </div>
          <label htmlFor="email" style={{ alignSelf: "center" }}>
            E-mail:
          </label>
          <input
            style={{ width: "75%" }}
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div id="loader">
            {onProcess ? (
              <Loading scale={0.5} />
            ) : (
              <button type="submit">
                <img src={loginIcon} alt="Login" />
              </button>
            )}
          </div>

          <Link style={{ marginBottom: 125 }} to="/auth/1">
            Já tem uma conta? Faça log-in aqui
          </Link>
        </RegisterForm>
      )}
    </Container>
  );
};

export default Authentication;
