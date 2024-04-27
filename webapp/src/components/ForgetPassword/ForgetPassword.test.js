import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgetPassword from './ForgetPassword';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
const mockAxios = new MockAdapter(axios);
describe('ForgetPassword Component', () => {
  test('renders Ask Email component', async () => {
    act( () => {
        render(<MemoryRouter><ForgetPassword /></MemoryRouter>);
    });
    await waitFor(() => expect(screen.getByText(i18en.t("forgotPassword.enter_email"))).toBeInTheDocument());
    expect(screen.getByText(/addUser.email_placeholder/)).toBeInTheDocument();
    expect(screen.getByText(/addUser.username_placeholder/)).toBeInTheDocument();
  });
  test('renders AskForCode component', async () => {
    var code = 111111
    var token = "mockedToken"
    act( () => {
        render(<MemoryRouter><ForgetPassword /></MemoryRouter>);
    });
    await waitFor(() => expect(screen.getByText(i18en.t("forgotPassword.enter_email"))).toBeInTheDocument());
    const emailInput = screen.getByPlaceholderText(/addUser.email_placeholder/i);
    const usernameInput = screen.getByPlaceholderText(/addUser.username_placeholder/i);
    //introducimos email y username
    expect(screen.getByText(/addUser.email_placeholder/)).toBeInTheDocument();
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(usernameInput, 'testuser');

    // Hacer clic en el botón de enviar
    const submitButton = screen.getByText(/forgotPassword.enter_email_button/i); // Ajusta el texto según el texto real del botón
    userEvent.click(submitButton);
    mockAxios.onPost('http://localhost:8000/forgetPassword').reply(200, "Email sent");
    act(async ()=>{
        await waitFor(async () => expect(screen.getByText(i18en.t("forgotPassword.enter_code")).toBeInTheDocument()));
        const inputs = screen.getAllByPlaceholderText('X');
        // Introducir el mismo carácter en todos los inputs
        userEvent.type(inputs[0], '1'); // Introducir el carácter '1', puedes cambiarlo al que desees
        userEvent.type(inputs[1], '1');
        userEvent.type(inputs[2], '1');
        userEvent.type(inputs[3], '1');
        userEvent.type(inputs[4], '1');
        userEvent.type(inputs[5], '1');
        // Simula un clic en el botón de submit
        fireEvent.click(screen.getByText(/"forgotPassword.send_code"/));
        mockAxios.onGet('http://localhost:8000/tokenFromCode/' + code).reply(200, 
        {token: token});
        //llegamos al replace
        await waitFor(async () => expect(screen.getByText(i18en.t("forgotPassword.enter_password")).toBeInTheDocument()));
        
        mockAxios.onPost('http://localhost:8000/changePassword').reply(200, { token: token, username: username});
        //me redirigen a game Menu
        await waitFor(async () => expect(screen.getByText(i18en.t('gameMenu.title')).toBeInTheDocument()));
        //la cookie queda bien seteada
        expect(Cookies.get('user')).toHaveProperty('token', token);
    });
  });


});
