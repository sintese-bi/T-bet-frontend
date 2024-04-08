import axios from "axios";

const apiURL = "https://api.tbet.com.br/v2/";

const api = axios.create({
  baseURL: apiURL,
});

export { api };
