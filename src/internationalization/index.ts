import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { getLocales } from 'react-native-localize';

import en from './en.js';
import fr from './fr.js';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  returnNull: false,
  interpolation: {
    escapeValue: false, // Not needed for react as it escapes by default
  },
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});

const locales = getLocales();

if (Array.isArray(locales)) {
  i18n.changeLanguage(locales[0].languageTag);
}

export default i18n;
