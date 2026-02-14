import { createDictionaries } from "../..";
import { englishMessages } from "./english";
import { germanMessages } from "./german";
import { persianMessages } from "./persian";

export const portfolioDictionaries = createDictionaries({
  english: englishMessages,
  persian: persianMessages,
  german: germanMessages,
});

export type PortfolioLocale = keyof typeof portfolioDictionaries;
export type PortfolioDictionary = (typeof portfolioDictionaries)[PortfolioLocale];
