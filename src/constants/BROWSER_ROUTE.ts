export const BROWSER_ROUTE = {
  LANDING_PAGE: "/",
  HOME: "/app/home",
  LOGIN: "/app/login",
  REGISTER: "/app/register",
} as const;

export type BrowserKeys = (typeof BROWSER_ROUTE)[keyof typeof BROWSER_ROUTE];
