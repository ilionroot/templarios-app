import axios from "axios";

export const api = axios.create({
  baseURL: "https://templarios-back.herokuapp.com",
  // baseURL: "http://192.168.1.20:5000",
});
