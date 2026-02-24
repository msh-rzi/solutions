export const locales = ['english', 'german'] as const;

export type Locale = (typeof locales)[number];

export type LocaleLabelMap = Partial<Record<Locale, string>>;

export const localeLabels = {
  english: 'English',
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
  TGerman extends DictionaryShape<TEnglish>,
> = {
  english: TEnglish;
  german: TGerman;
};

export const createDictionaries = <
  TEnglish extends Dictionary,
  TGerman extends DictionaryShape<TEnglish>,
>(
  dictionaries: Dictionaries<TEnglish, TGerman>,
) => dictionaries;

export const getDictionary = <
  TEnglish extends Dictionary,
  TGerman extends DictionaryShape<TEnglish>,
>(
  dictionaries: Dictionaries<TEnglish, TGerman>,
  locale: Locale,
) => dictionaries[locale];
