import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './assets/i18n/fr.json';
import en from './assets/i18n/en.json';
import es from './assets/i18n/es.json';
import de from './assets/i18n/de.json';
import { DEFAULT_LANGUAGE } from '@labrute/core';

export const defaultNS = 'common';
export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
  de: {
    translation: de,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE,
  resources,
  interpolation: {
    escapeValue: false
  }
}).catch((err) => {
  console.error('Error loading language', err);
});

export default i18n;