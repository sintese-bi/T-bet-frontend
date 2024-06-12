import { COUNTRIES_CODES } from "../constants/COUNTRIES_CODES";

type CountryName = keyof typeof COUNTRIES_CODES;

export const getCountryFlag = (country: string) => {
  const code = COUNTRIES_CODES[country as CountryName]?.toLowerCase() || "AO";

  return code || "";
};
