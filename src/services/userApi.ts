import axios from "axios";

const apiURL = "https://api2.tbet.com.br";

const userApi = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token@TBet")}`,
  },
  baseURL: apiURL,
});

export { userApi };
