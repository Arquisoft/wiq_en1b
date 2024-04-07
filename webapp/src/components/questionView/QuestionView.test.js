import { render , screen, waitFor, fireEvent } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import QuestionView from './QuestionView';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { UserContextProvider} from '../loginAndRegistration/UserContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {configure} from '@testing-library/dom';


configure({
   testIdAttribute: 'data-value',
});

const mockAxios = new MockAdapter(axios);



i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

describe('Question View component', () => {

    beforeEach(() => {
        mockAxios.reset();
    });
    
    it('shows the no_questions_message as the endpoint does not exist',async () => {
        render(<UserContextProvider><MemoryRouter><QuestionView /></MemoryRouter></UserContextProvider>);
        const text = screen.getByText(i18en.t('questionView.no_questions_message'));
        expect(text).toBeInTheDocument();
        // Wait for questions to load
        
    });
    it('shows a question and answers',async () => {
       
        mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
                                                                [{question: "What is the population of Oviedo?",
                                                                answers: ["225089","272357","267855","231841"]}]);

        //It gives an error as we are not wrapping it by act, however by doing this we simulate a no questions situation
        await act(async () =>{
            await render(<UserContextProvider><MemoryRouter><QuestionView /></MemoryRouter></UserContextProvider>);
        })

        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());

        //Now that we know the question is showing
        expect(screen.getByText('225089')).toBeInTheDocument()
        expect(screen.getByText('272357')).toBeInTheDocument()
        expect(screen.getByText('267855')).toBeInTheDocument()
        expect(screen.getByText('231841')).toBeInTheDocument()
        
    });
    it('shows colors to reveal correct answer', async () => {
        mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
                                                                [{question: "What is the population of Oviedo?",
                                                                answers: ["225089","272357","267855","231841"]}]);
        await act(async () =>{
            await render(<UserContextProvider><MemoryRouter><QuestionView /></MemoryRouter></UserContextProvider>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('true'));//clicamos en la respuesta correcta
        // Esperar un segundo antes de continuar
        await waitFor(() => {
            // Clic en un botón de respuesta con data-value=true
            const correctAnswerButton = screen.getByTestId('true');
            // Verificar que el botón tenga el color esperado
            expect(correctAnswerButton).toHaveStyle('background-color: #6EF26E');
        }, { timeout: 1000 }); // Esperar 1 segundo
    });
    it('shows colors to reveal false answer', async () => {
        mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
                                                                [{question: "What is the population of Oviedo?",
                                                                answers: ["225089","272357","267855","231841"]}]);
        await act(async () =>{
            await render(<UserContextProvider><MemoryRouter><QuestionView /></MemoryRouter></UserContextProvider>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        fireEvent.click(screen.getAllByTestId('false')[0]);
        // Esperar un segundo antes de continuar
        await waitFor(() => {
            // Clic en un botón de respuesta con data-value=true
            const incorrectAnswerButton = screen.getAllByTestId('false')[0];
            // Verificar que el botón tenga el color esperado
            expect(incorrectAnswerButton).toHaveStyle('background-color: #FF6666');
        }, { timeout: 1000 }); // Esperar 1 segundo
    });
    it('shows timer', async () => {
        mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
                                                                [{question: "What is the population of Oviedo?",
                                                                answers: ["225089","272357","267855","231841"]}]);
        await act(async () =>{
            await render(<UserContextProvider><MemoryRouter><QuestionView /></MemoryRouter></UserContextProvider>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        const timerElement = screen.getByText(new RegExp(`(\\d+) ${i18en.t('questionView.seconds')}`));
        expect(timerElement).toBeInTheDocument(); // Verificar que el temporizador esté presente en el DOM
    });
    
});