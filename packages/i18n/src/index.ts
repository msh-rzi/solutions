export type Locale = "english" | "persian" | "german";

type StringMap = Record<string, string>;

export type Dictionaries<
  TEnglish extends StringMap,
  TPersian extends { [K in keyof TEnglish]: string },
  TGerman extends { [K in keyof TEnglish]: string },
> = {
  english: TEnglish;
  persian: TPersian;
  german: TGerman;
};

export const createDictionaries = <
  TEnglish extends StringMap,
  TPersian extends { [K in keyof TEnglish]: string },
  TGerman extends { [K in keyof TEnglish]: string },
>(
  dictionaries: Dictionaries<TEnglish, TPersian, TGerman>,
) => dictionaries;

export const getDictionary = <
  TEnglish extends StringMap,
  TPersian extends { [K in keyof TEnglish]: string },
  TGerman extends { [K in keyof TEnglish]: string },
>(
  dictionaries: Dictionaries<TEnglish, TPersian, TGerman>,
  locale: Locale,
) => dictionaries[locale];
