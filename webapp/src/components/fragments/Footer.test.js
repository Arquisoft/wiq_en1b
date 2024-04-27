import { render , screen } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';

import App from '../../App'

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

describe('Footer fragment', () => {

    

    test('Footer renders correctly', async () => {
        render(
            <App />
        );
        expect(screen.getByText('footer.about')).toBeInTheDocument();
        expect(screen.getByText('footer.API')).toBeInTheDocument();
        expect(screen.getByText('footer.ARC')).toBeInTheDocument();

    
  
    
       
      });
});

