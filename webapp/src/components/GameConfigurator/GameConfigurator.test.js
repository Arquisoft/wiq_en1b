import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import { BrowserRouter as Router } from 'react-router-dom';
import GameConfigurator from './GameConfigurator';
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

describe('GameConfigurator', () => {
  test('renders GameConfigurator component', () => {
    render(<Router><GameConfigurator /></Router>);
    expect(screen.getByText(i18en.t("gameConfigurator.game_config"))).toBeInTheDocument();
  });


  test('updates tipoPregunta state when select value changes', () => {
    render(<Router><GameConfigurator /></Router>);
    const selectElement = screen.getByLabelText(i18en.t("gameConfigurator.type_quest"));
    fireEvent.change(selectElement, { target: { value: 'CAPITAL' } });
    expect(selectElement.value).toBe('CAPITAL');
  });
  
  test('updates numeroPreguntas state when input value changes', () => {
    render(<Router><GameConfigurator /></Router>);
    const inputElement = screen.getByLabelText(i18en.t("gameConfigurator.num_quest"));
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(inputElement.value).toBe('10');
  });
  it('renders option to play customized game', () => {
    render(<Router><GameConfigurator /></Router>);
    const text = screen.getByText(i18en.t('gameConfigurator.custo_game'));
    expect(text).toBeInTheDocument();
});

it('renders option to play Competitive game', () => {
    render(<Router><GameConfigurator /></Router>);
    const text = screen.getByText(i18en.t('gameConfigurator.competi_game'));
    expect(text).toBeInTheDocument();
});

});
