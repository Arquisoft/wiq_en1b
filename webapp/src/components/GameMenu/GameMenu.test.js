import { render, screen } from '@testing-library/react';
import GameMenu from './GameMenu';
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
/*
test('renders learn react link', () => {
    render(<MemoryRouter><GameMenu /></MemoryRouter>);
    const linkElement = screen.getByText(/Game Menu/i);
    expect(linkElement).toBeInTheDocument();
});*/

describe('GameMenu component', () => {
    it('renders Title for Game Menu view', () => {
        render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.title'));
        expect(text).toBeInTheDocument();
    });

    it('renders option to create a new Game', () => {
        render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.new_game_button'));
        expect(text).toBeInTheDocument();
    });

    it('renders option to view historical data', () => {
        render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.history_button'));
        expect(text).toBeInTheDocument();
    });
});


