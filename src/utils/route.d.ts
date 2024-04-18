import { BrowserKeys } from "../constants/BROWSER_ROUTE";
export type RedirectProps = {
  navigate: (path: BrowserKeys) => void;
};
