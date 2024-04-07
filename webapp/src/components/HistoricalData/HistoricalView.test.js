import { render , screen, waitFor, fireEvent } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { UserContextProvider} from '../loginAndRegistration/UserContext';
import HistoricalView from './HistoricalView';
import { act } from 'react-dom/test-utils';
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
    it('renders no games if the api is down', () => {
        const user = { username: 'dummy' };
        render(<UserContextProvider baseUser={user}><MemoryRouter><HistoricalView /></MemoryRouter></UserContextProvider>);
        const text = screen.getByText(i18en.t('historicalView.no_games_played'));
        expect(text).toBeInTheDocument();
    });
    it('renders no games if the user has no games', async () => {
        const user = { username: 'dummy' };
        mockAxios.onGet('http://localhost:8000/record/dummy').reply(200, "undefined");

        await act(async()=>
            await render(<UserContextProvider baseUser={user}><MemoryRouter><HistoricalView /></MemoryRouter></UserContextProvider>)
        )   
        const text = screen.getByText(i18en.t('historicalView.no_games_played'));
        expect(text).toBeInTheDocument();
    });
    it('renders Game Record Buttons', async () => {
        const user = { username: 'dummy' };
        mockAxios.onGet('http://localhost:8000/record/dummy').reply(200, 
                                                                        {record : {user: "dummy",
                                                                        games: [{
                                                                            questions: [{
                                                                                question: "What is the capital of Spain?",
                                                                                answers: ["Madrid", "Dubai", "London", "Barcelona"],
                                                                                answerGiven: "Madrid",
                                                                                correctAnswer: "Madrid"
                                                                            }],
                                                                            points: "200",
                                                                            date: "1712344268728"
                                                                        }]}});

        await act(async()=>
            await render(<UserContextProvider baseUser={user}><MemoryRouter><HistoricalView /></MemoryRouter></UserContextProvider>)
        )   
        const regex = /\d{1,2}\/\d{1,2}\/\d{4}/; // Expresión regular para el formato de fecha "MM/DD/YYYY" o "M/D/YYYY"
        const textRegex = new RegExp(regex);

        const textElement = await screen.findByText(textRegex);
        expect(textElement).toBeInTheDocument();
    });
    
});