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

it('should set random values for type and number of questions when randomize button is clicked', () => {
  const { getByText, getByRole } = render(<Router><GameConfigurator /></Router>);

  // Encuentra el botón de randomize
  const randomizeButton = getByText('gameConfigurator.randomize');

  // Simula el clic en el botón de randomize
  fireEvent.click(randomizeButton);

  // Verifica que el tipo de pregunta sea uno de los valores esperados
  const select = getByRole('combobox'); // Localiza el campo de selección
  const validOptions = ['ALL', 'POPULATION', 'CAPITAL', 'LANGUAGE', 'SIZE', 'HEAD_OF_GOVERMENT'];
  expect(validOptions).toContain(select.value); // Verifica que el valor esté en las opciones válidas

  // Verifica que el número de preguntas esté entre 1 y 20
  const numberInput = getByRole('spinbutton'); // Localiza el spinner
  const numQuestions = parseInt(numberInput.value, 10);
  expect(numQuestions).toBeGreaterThanOrEqual(1);
  expect(numQuestions).toBeLessThanOrEqual(20);
});

});
