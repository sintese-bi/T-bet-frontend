export const BROWSER_ROUTE = {
  LANDING_PAGE: "/",
  HOME: "/app/home",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/passwordRecovery",
} as const;

export type BrowserKeys = (typeof BROWSER_ROUTE)[keyof typeof BROWSER_ROUTE];
