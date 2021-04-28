import { api } from "./api";

export async function signIn(e, username, password) {
  e.preventDefault();

  if (username.trim() && password.trim()) {
    return await api({
      method: "post",
      url: "/user/login",
      data: {
        username,
        password,
      },
    });
  }
}

export async function signUp(e, username, password, cpassword, email) {
  e.preventDefault();

  if (
    username.trim() &&
    password.trim() &&
    cpassword.trim() &&
    email.trim() &&
    password === cpassword
  ) {
    const formData = new FormData();
    const imagefile = document.querySelector("#file");

    formData.append("file", imagefile.files[0]);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    return await api.post("/user/register", formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
      },
    });
  }
}
