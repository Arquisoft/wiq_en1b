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

describe('Historical View component', () => {
    it('renders Game Record Buttons', () => {
        /*render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.title'));
        expect(text).toBeInTheDocument();*/
    });
    it('clicking Game Record Buttons Record Lists are displayed', () => {
        /*render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.title'));
        expect(text).toBeInTheDocument();*/
    });
});