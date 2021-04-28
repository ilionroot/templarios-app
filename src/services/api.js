import axios from "axios";

export const api = axios.create({
  baseURL: "https://templarios-back.herokuapp.com",
});
