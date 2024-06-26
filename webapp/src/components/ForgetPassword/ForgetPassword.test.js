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
import ForgetPasswordFunctions from './ForgetPasswordFunctions';
i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
const mockAxios = new MockAdapter(axios);

const code = 111111
const token = "mockedToken"

jest.mock('axios');
describe('ForgetPassword Component', () => {
  test('renders Ask Email component', async () => {
    act( () => {
        render(<MemoryRouter><ForgetPassword /></MemoryRouter>);
    });
    await waitFor(() => expect(screen.getByText(i18en.t("forgotPassword.enter_email"))).toBeInTheDocument());
    expect(screen.getByText(/addUser.email_placeholder/)).toBeInTheDocument();
    expect(screen.getByText(/addUser.username_placeholder/)).toBeInTheDocument();
  });

  test('show email errors', async () => {
    await act( () => {
      render(<MemoryRouter><ForgetPassword /></MemoryRouter>);
    });
    await waitFor(() => expect(screen.getByText(i18en.t("forgotPassword.enter_email"))).toBeInTheDocument());
    
    await act(async () => { await insertEmail('testexample.com', 'testuser') })

    await waitFor(() => {
      expect(screen.getByText('addUser.error_wrong_email_format')).toBeInTheDocument();
    })
  })

  
  test('change password', async () => {
    act( () => {
        render(<MemoryRouter><ForgetPassword /></MemoryRouter>);
    });
    mockAxios.onPost('http://localhost:8000/forgetPassword').reply(200, "Email sent");
    await waitFor(() => expect(screen.getByText(i18en.t("forgotPassword.enter_email"))).toBeInTheDocument());
    insertEmail('test@example.com', 'testuser')
   
    
    act(async ()=>{
        await waitFor(async () => expect(screen.getByText(i18en.t("forgotPassword.enter_code")).toBeInTheDocument()));
        
        insertCode(['1', '1', '1', '1' ,'1' ,'1' ,'1'])
        expect(screen.getByText("Netwok Error")).toBeInTheDocument()

        mockAxios.onGet('http://localhost:8000/tokenFromCode/' + code).reply(200, 
        {token: token});
        insertCode(['1', '1', '1', '1' ,'1' ,'1'])
        expect(screen.getByText("Fill the code")).toBeInTheDocument()

        insertCode(['1', '1', '1', '1' ,'1' ,'1' ,'1'])
        
        //llegamos al replace
        await waitFor(async () => expect(screen.getByText(i18en.t("forgotPassword.enter_password")).toBeInTheDocument()));
        
        mockAxios.onPost('http://localhost:8000/changePassword').reply(200, { token: token, username: username});

        fillPassword('123456', '123456')
        expect(screen.getByText(/addUser.very_weak_password/)).toBeInTheDocument();

        fillPassword('Mario12@@', 'Mario12@@')
        expect(screen.getByText(/addUser.weak_password/)).toBeInTheDocument();

        fillPassword('NvtL+k?qg9', 'NvtL+k?qg9')
        expect(screen.getByText(/addUser.good_password/)).toBeInTheDocument();

        fillPassword('NvtL+k?qg953tD8', 'NvtL+k?qg953tD8') 
        expect(screen.getByText(/addUser.strong_password/)).toBeInTheDocument();

        await insertPassword('NvtL+k?qg953tD8', 'NvtL+k?qg953tD8')
        //me redirigen a game Menu
        await waitFor(async () => expect(screen.getByText(i18en.t('gameMenu.title')).toBeInTheDocument()));
        //la cookie queda bien seteada
        expect(Cookies.get('user')).toHaveProperty('token', token);
    });
  });


  describe('ForgetPasswordFunctions', () => {
    let forgetPasswordFunctions;
  
    beforeEach(() => {
      forgetPasswordFunctions = new ForgetPasswordFunctions();
    });
  
    describe('sendEmail', () => {
      it('should send email and return true on success', async () => {
        axios.post.mockResolvedValue({ data: true });
        const result = await forgetPasswordFunctions.sendEmail('test@example.com', 'testuser');
        expect(result).toBe(true);
      });
  
      it('should throw error on failure', async () => {
        axios.post.mockRejectedValue(new Error('Failed to send email'));
        await expect(forgetPasswordFunctions.sendEmail('test@example.com', 'testuser')).rejects.toThrow('Failed to send email');
      });
    });
  
    describe('tokenFromCode', () => {
      it('should get token from code and set it', async () => {
        const token = 'testToken';
        axios.get.mockResolvedValue({ data: { token } });
        await forgetPasswordFunctions.tokenFromCode('testCode');
        expect(forgetPasswordFunctions.token).toBe(token);
      });
  
      it('should throw error on failure', async () => {
        axios.get.mockRejectedValue(new Error('Failed to get token'));
        await expect(forgetPasswordFunctions.tokenFromCode('testCode')).rejects.toThrow('Failed to get token');
      });
    });
  
    describe('changePassword', () => {
      it('should change password', async () => {
        const response = { data: 'Password changed successfully' };
        axios.post.mockResolvedValue(response);
        const result = await forgetPasswordFunctions.changePassword('test@example.com', 'testuser', 'newpassword', 'newpassword');
        expect(result).toEqual(response);
      });
  
      it('should throw error on failure', async () => {
        axios.post.mockRejectedValue(new Error('Failed to change password'));
        await expect(forgetPasswordFunctions.changePassword('test@example.com', 'testuser', 'newpassword', 'newpassword')).rejects.toThrow('Failed to change password');
      });
    });

    describe('checkUrl', () => {
      it('should have base url', async () => {
        expect(forgetPasswordFunctions.apiUrl).toEqual('http://localhost:8000');
      });
  
      it('should have env variable url', async () => {
        process.env.REACT_APP_API_ENDPOINT = 'test';
        forgetPasswordFunctions = new ForgetPasswordFunctions();
        expect(forgetPasswordFunctions.apiUrl).toEqual('test');
      });
    });
  });
});



async function insertEmail(email, username) {
  const emailInput = screen.getByPlaceholderText(/addUser.email_placeholder/i);
  const usernameInput = screen.getByPlaceholderText(/addUser.username_placeholder/i);
  //introducimos email y username
  expect(screen.getByText(/addUser.email_placeholder/)).toBeInTheDocument();
  userEvent.type(emailInput, email);
  userEvent.type(usernameInput, username);
  const submitButton = screen.getByText(/forgotPassword.enter_email_button/i); // Ajusta el texto según el texto real del botón
  userEvent.click(submitButton);
}

async function insertCode(code){
  const inputs = screen.getAllByPlaceholderText('X');
  // Introducir el mismo carácter en todos los inputs
  for(let i = 0; i < code.length; i++)
    userEvent.type(inputs[i], code[i]); 
  // Simula un clic en el botón de submit
  fireEvent.click(screen.getByText(/"forgotPassword.send_code"/));
}

async function insertPassword(password, repeatPassword) {
  fillPassword(password, repeatPassword)
  const submitButton = screen.getByText(/forgotPassword.enter_password_button/i); // Ajusta el texto según el texto real del botón
  userEvent.click(submitButton);
}

function fillPassword(password, repeatPassword) {
  const passwordInput = screen.getByPlaceholderText(/addUser.password_placeholder/i);
  const passwordRepeatInput = screen.getByPlaceholderText(/addUser.repeat_password_placeholder/i);

  expect(screen.getByText(/addUser.email_placeholder/)).toBeInTheDocument();
  userEvent.type(passwordInput, password);
  userEvent.type(passwordRepeatInput, repeatPassword);
}