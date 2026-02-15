import { getDictionary, type Locale } from '@repo/i18n';
import { portfolioDictionaries } from '@repo/i18n/portfolio';

export function getPortfolioDictionary(locale: Locale = 'english') {
  return getDictionary(portfolioDictionaries, locale);
}
