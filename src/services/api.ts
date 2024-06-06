import axios from "axios";

const apiURL = "https://api.tbet.com.br";

const gameAPI = axios.create({
  baseURL: apiURL,
});

export { gameAPI };
