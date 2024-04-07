import { render , screen, waitFor } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import { MemoryRouter } from 'react-router-dom';

import { UserContextProvider} from '../loginAndRegistration/UserContext';
import Navbar from '../fragments/NavBar';


i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

describe('NavBar fragment', () => {

    it('shows the user name',async () => {
        const user = { username: 'dummy' };
        render(<UserContextProvider baseUser={user}><MemoryRouter><Navbar style={{ width: '100%' }} /></MemoryRouter></UserContextProvider>);
        const text2 = await screen.findByText('dummy')
        expect(text2).toBeInTheDocument();
        // Wait for questions to load
        
    });
});