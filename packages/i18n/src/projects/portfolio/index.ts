import { createDictionaries } from "../..";
import { englishMessages } from "./english";
import { germanMessages } from "./german";

export const portfolioDictionaries = createDictionaries({
  english: englishMessages,
  german: germanMessages,
});

export type PortfolioLocale = keyof typeof portfolioDictionaries;
export type PortfolioDictionary = (typeof portfolioDictionaries)[PortfolioLocale];
