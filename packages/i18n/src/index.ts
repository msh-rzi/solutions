export const locales = ['english', 'persian', 'german'] as const;

export type Locale = (typeof locales)[number];

export type LocaleLabelMap = Partial<Record<Locale, string>>;

export const localeLabels = {
  english: 'English',
  persian: 'Persian',
  german: 'German',
} as const satisfies Record<Locale, string>;

type DictionaryValue =
  | string
  | { readonly [key: string]: DictionaryValue }
  | readonly DictionaryValue[];

type Dictionary = { readonly [key: string]: DictionaryValue };

type DictionaryShape<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DictionaryShape<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DictionaryShape<T[K]> }
      : never;

export type Dictionaries<
  TEnglish extends Dictionary,
  TPersian extends DictionaryShape<TEnglish>,
  TGerman extends DictionaryShape<TEnglish>,
> = {
  english: TEnglish;
  persian: TPersian;
  german: TGerman;
};

export const createDictionaries = <
  TEnglish extends Dictionary,
  TPersian extends DictionaryShape<TEnglish>,
  TGerman extends DictionaryShape<TEnglish>,
>(
  dictionaries: Dictionaries<TEnglish, TPersian, TGerman>,
) => dictionaries;

export const getDictionary = <
  TEnglish extends Dictionary,
  TPersian extends DictionaryShape<TEnglish>,
  TGerman extends DictionaryShape<TEnglish>,
>(
  dictionaries: Dictionaries<TEnglish, TPersian, TGerman>,
  locale: Locale,
) => dictionaries[locale];
