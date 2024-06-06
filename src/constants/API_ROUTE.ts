export const API_ROUTE = {
  GET_NEXT_GAMES: "/v2/nextgames",

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
