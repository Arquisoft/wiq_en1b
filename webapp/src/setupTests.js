// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Configuración de i18next
i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en', 
  interpolation: {
    escapeValue: false, 
  },
});

global.i18n = i18n;
