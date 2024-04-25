import { render , screen, waitFor, fireEvent } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import QuestionView from './QuestionView';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {configure} from '@testing-library/dom';
import Cookies from 'js-cookie'

// Función para configurar el mock de global.Audio
const setupAudioMock = () => {
    jest.spyOn(global, 'Audio').mockImplementation(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        loop: true
    }));
};

// Mock the SpeechSynthesisUtterance and window.speechSynthesis APIs
global.SpeechSynthesisUtterance = jest.fn(() => ({
    lang: '',
    text: '',
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));

global.window.speechSynthesis = {
    getVoices: jest.fn(() => []),
    speak: jest.fn(),
};

configure({
   testIdAttribute: 'data-value',
});

const mockAxios = new MockAdapter(axios);
jest.setTimeout(10000);


i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;
Cookies.set('user', JSON.stringify({username:"dummy", token:"fasfda"}))

describe('Question View component', () => {

    mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
    [{question: "What is the population of Oviedo?",
    answers: ["225089","272357","267855","231841"]}]);
    
    it('shows the no_questions_message as the endpoint does not exist',async () => {
        render(<MemoryRouter><QuestionView /></MemoryRouter>);
        const text = screen.getByText(i18en.t('questionView.no_questions_message'));
        expect(text).toBeInTheDocument();
        // Wait for questions to load
        
    });

     // Test for sound functionality
     it('speaks the question when the speaker button is clicked', async () => {
        
        await act(async () => {
            render(<MemoryRouter><QuestionView /></MemoryRouter>);
        });
        
        fireEvent.click(screen.getByText('🔊'));
        
        // Check if the SpeechSynthesisUtterance is called with the correct text
        expect(global.SpeechSynthesisUtterance).toHaveBeenCalledWith();
        
       
    });

    it('shows a question and answers',async () => {

        //It gives an error as we are not wrapping it by act, however by doing this we simulate a no questions situation
        await act(async () =>{
            await render(<MemoryRouter><QuestionView /></MemoryRouter>);
        })

        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());

        //Now that we know the question is showing
        expect(screen.getByText('225089')).toBeInTheDocument()
        expect(screen.getByText('272357')).toBeInTheDocument()
        expect(screen.getByText('267855')).toBeInTheDocument()
        expect(screen.getByText('231841')).toBeInTheDocument()
        
    });
    it('shows colors to reveal correct answer and it sounds', async () => {
        setupAudioMock();
        await act(async () =>{
            await render(<MemoryRouter><QuestionView /></MemoryRouter>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        fireEvent.click(screen.getByTestId('true'));//clicamos en la respuesta correcta
        expect(global.Audio).toHaveBeenCalledWith('/correct.mp3');

        // Esperar un segundo antes de continuar
        await waitFor(() => {
            // Clic en un botón de respuesta con data-value=true
            const correctAnswerButton = screen.getByTestId('true');
            // Verificar que el botón tenga el color esperado
            expect(correctAnswerButton).toHaveStyle('background-color: #6EF26E');
        }, { timeout: 1000 }); // Esperar 1 segundo
    });
    
    it('shows colors to reveal false answer and it sounds', async () => {
        setupAudioMock()
        await act(async () =>{
            await render(<MemoryRouter><QuestionView /></MemoryRouter>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        fireEvent.click(screen.getAllByTestId('false')[1]);//clicamos en la respuesta incorrecta
        expect(global.Audio).toHaveBeenCalledWith('/incorrect.mp3');        
        // Esperar un segundo antes de continuar
        await waitFor(() => {
            // Clic en un botón de respuesta con data-value=true
            const incorrectAnswerButton = screen.getAllByTestId('false')[1];
            // Verificar que el botón tenga el color esperado
            expect(incorrectAnswerButton).toHaveStyle('background-color: #FF6666');
        }, { timeout: 1000 }); // Esperar 1 segundo
    });
    
    it('shows timer', async () => {
        setupAudioMock()
        await act(async () =>{
            await render(<MemoryRouter><QuestionView /></MemoryRouter>);
            
        })
        await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());
        // expect(global.Audio).toHaveBeenCalledWith('/tictac.mp3');

        const timerElement = screen.getByText(new RegExp(`(\\d+) ${i18en.t('questionView.seconds')}`));
        expect(timerElement).toBeInTheDocument(); // Verificar que el temporizador esté presente en el DOM
    }); 
    
    it('shows finish game review',async () => {      
        mockAxios.onGet('http://localhost:8000/questions/en').reply(200, []);                                                          
        mockAxios.onPost('http://localhost:8000/record').reply(200, {user:'myUser'});

        //It gives an error as we are not wrapping it by act, however by doing this we simulate a no questions situation
        await act(async () =>{
            await render(<MemoryRouter><QuestionView /></MemoryRouter>);
        })  

        await waitFor(() => expect(screen.getByText(i18en.t('questionView.finished_game'))).toBeInTheDocument()); 

        expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument()
        
    });
    

    // it('renders end message when countdown completes', async() => {
      
    //     setupAudioMock()
    //     mockAxios.onGet('http://localhost:8000/questions/en').reply(200, 
    //                                                             [{question: "What is the population of Oviedo?",
    //                                                             answers: ["225089","272357","267855","231841"]}]);
    //     await act(async () =>{
    //         await render(<MemoryRouter><QuestionView /></MemoryRouter>);
            
    //     })
    //     await waitFor(() => expect(screen.getByText('What is the population of Oviedo?')).toBeInTheDocument());

    //     const timerElement = screen.getByText(new RegExp(`(\\d+) ${i18en.t('questionView.seconds')}`));
    //     expect(timerElement).toBeInTheDocument(); // Verificar que el temporizador esté presente en el DOM

        
    //     await waitFor(() => {
    //         expect(screen.getByText("Time's up!")).toBeInTheDocument();
    //     }, { timeout: 9800 }); // Esperar 10 segundos
    // });
    
});