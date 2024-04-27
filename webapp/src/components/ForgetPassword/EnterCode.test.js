import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Permite usar aserciones extendidas
import EnterCode from './EnterCode'; // Ruta al componente

// Mock de `useTranslation`
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key) => key, // Simula la traducción devolviendo la clave
  }),
}));

describe('EnterCode Component', () => {
  it('should render correctly with six input fields', () => {
    const obtainCodeMock = jest.fn();
    const showErrorsMock = jest.fn(); // Mock de función para mostrar errores

    const { getAllByPlaceholderText, getByText } = render(
      <EnterCode
        t={(key) => key}
        obtainCode={obtainCodeMock}
        showErrors={showErrorsMock}
      />
    );

    // Verificar que se rendericen seis campos de entrada
    const inputFields = getAllByPlaceholderText('X');
    expect(inputFields.length).toBe(6); // Espera seis campos de entrada
    
    // Verificar que el título y el botón de envío están presentes
    expect(getByText('forgotPassword.enter_code')).toBeInTheDocument();
    expect(getByText('forgotPassword.send_code')).toBeInTheDocument();
  });

  it('should call obtainCode when the form is submitted', () => {
    const obtainCodeMock = jest.fn();
    const showErrorsMock = jest.fn();
    const { getByText } = render(
      <EnterCode
        t={(key) => key}
        obtainCode={obtainCodeMock}
        showErrors={showErrorsMock}
      />
    );

    // Simular el evento de envío del formulario
    const form = getByText('forgotPassword.send_code').closest('form');
    fireEvent.submit(form);

    // Verificar que `obtainCode` fue llamado al enviar el formulario
    expect(obtainCodeMock).toHaveBeenCalled();
  });
});
