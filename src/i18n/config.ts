import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languageType } from '../store';

import translation_en from './en.json';
import translation_zh from './zh.json';

const lngKey = '__lng__';

export const getStorageLng: () => languageType = () => {
  return (window.localStorage.getItem(lngKey) as languageType) ?? 'zh';
};

export const setStorageLng = (lng: string) => {
  window.localStorage.setItem(lngKey, lng);
};

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getStorageLng(),
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});
