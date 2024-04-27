import React from 'react';
import { render , screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importa para extender expect
import { act } from 'react-dom/test-utils';
import EnterCode from './EnterCode';
import i18en from 'i18next';
import { initReactI18next } from 'react-i18next';
i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
describe('EnterCode component', () => {
  it('renders six input fields correctly',async () => {
    const obtainCodeMock = jest.fn();
    const showErrors = jest.fn();
    act(()=>{
        render(<EnterCode  t={i18en.t} obtainCode={obtainCodeMock} showErrors={showErrors}/>);
    });
    
    await waitFor(async () => await expect(screen.getByText(i18en.t("forgotPassword.enter_code")).toBeInTheDocument()));
    expect(screen.getByText('X').toBeInTheDocument());
    // Expect to find six elements with the class 'input'
    //expect(inputFields.length).toBe(6);
  });
 /*
  it('calls obtainCode function when form is submitted', () => {
   
    const obtainCodeMock = jest.fn();
    const showErrors = jest.fn();
    const { getByText } = render(<EnterCode  t={i18en.t} obtainCode={obtainCodeMock} showErrors={showErrors}/>);

    fireEvent.submit(getByText('Submit'));

    expect(obtainCodeMock).toHaveBeenCalledTimes(1);
  });
*/
  // Add more tests as needed
});
