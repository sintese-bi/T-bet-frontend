import axios from "axios";

const apiURL = "https://api2.tbet.com.br";

const userApi = axios.create({
  baseURL: apiURL,
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token@TBet");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { userApi };
