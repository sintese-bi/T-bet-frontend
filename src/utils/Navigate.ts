import { useNavigate } from "react-router-dom";
import { BrowserKeys } from "../constants";

export const NavigateTo = (path: BrowserKeys) => {
  const navigate = useNavigate();

  navigate(String(path));
};
