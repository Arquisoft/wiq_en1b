import { render , screen, fireEvent } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar'
import Cookies from 'js-cookie'
import App from '../../App'

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
Cookies.set('user', JSON.stringify({ username: 'dummy' }))

describe('NavBar fragment', () => {

    it('shows the user name',async () => {
        render(<MemoryRouter><Navbar style={{ width: '100%' }} /></MemoryRouter>);
        const text2 = await screen.findByText('dummy')
        expect(text2).toBeInTheDocument();
        // Wait for questions to load
        
    });

    test('Navbar renders correctly', async () => {
        render(
            <App />
        );
    
        expect(screen.getByAltText('App logo')).toBeInTheDocument();
        expect(screen.getByAltText('Help')).toBeInTheDocument();
        expect(screen.getByText('navBar.title')).toBeInTheDocument();
        expect(screen.getByText('navBar.language')).toBeInTheDocument();
    
      fireEvent.click(screen.getByText('navBar.language'));
    
      // Change to spanish
      fireEvent.click(screen.getByText('navBar.es'));
    
      // Go to instructions
      fireEvent.click(screen.getByAltText('Help'));
      expect(screen.getByText('instructions.title')).toBeInTheDocument();
    
       
      });
});

