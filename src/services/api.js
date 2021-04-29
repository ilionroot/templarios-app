import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.20:5000",
});

// https://templarios-back.herokuapp.com
