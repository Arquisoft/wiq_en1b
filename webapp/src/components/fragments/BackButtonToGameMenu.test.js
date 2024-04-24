import { render, screen } from '@testing-library/react';
import BackButtonToGameMenu from './BackButtonToGameMenu';
import { MemoryRouter } from 'react-router-dom';

import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;


describe('BackButtonToGameMenu component', () => {

    it('renders option to go back to the game menu', () => {
        render(<MemoryRouter><BackButtonToGameMenu t={i18n.t} /></MemoryRouter>);
        const text = screen.getByText((content, element) => {
            const regex = new RegExp(i18en.t("gameMenu.back"));
            return regex.test(content);
          });
          
        expect(text).toBeInTheDocument();
    });
});


