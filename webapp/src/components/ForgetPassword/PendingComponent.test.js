import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import PendingComponent from './PendingComponent';


i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;


describe('Pending Component', () => {
  test('renders Ask Email component', async () => {
    act( () => {
        render(<MemoryRouter><PendingComponent t={i18en.t} /></MemoryRouter>);
    });
    await waitFor(() => expect(screen.getByText(/forgotPassword.sending_title/)).toBeInTheDocument());
    expect(screen.getByText(/forgotPassword.sending_paragraph/)).toBeInTheDocument();
  });
});
