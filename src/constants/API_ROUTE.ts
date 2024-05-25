export const API_ROUTE = {
  GET_LEAGUE_GAME: "/v2/league?league=leagueId",
  GET_GAME: "/v2/infogamesGale",
  GET_GAME_RATE: "/v2/rate",
  IP_ADDRESS: "https://api.ipify.org/",

  //? User
  REGISTER_USER: "/v1/register",
  LOGIN_USER: "/v1/login",
  GET_USER: "/v1/userinfo",
  UPDATE_USER: "/v1/userupdate",
  BUY_CREDITS: "/stripe-webhook",
  RESET_PASSWORD_LINK: "/v1/sendemail",
  RESET_PASSWORD:
    "/v1/password-recovery?use_token={{token}}&use_email={{email}}",
};
