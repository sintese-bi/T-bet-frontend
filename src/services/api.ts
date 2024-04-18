import axios from "axios";

const apiURL = "https://api.tbet.com.br";

const api = axios.create({
  baseURL: apiURL,
});

export { api };
