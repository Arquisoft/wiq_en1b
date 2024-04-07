import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const mockAxios = new MockAdapter(axios);
i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

describe('Historical View component', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    it('renders Game Record Buttons', () => {
        mockAxios.onGet('http://localhost:8000/record/dummy').reply(200, 
                                                                [{question: "What is the population of Oviedo?",
                                                                answers: ["225089","272357","267855","231841"]}]);

        
    });
    it('clicking Game Record Buttons Record Lists are displayed', () => {
        /*render(<MemoryRouter><GameMenu /></MemoryRouter>);
        const text = screen.getByText(i18en.t('gameMenu.title'));
        expect(text).toBeInTheDocument();*/
    });
});