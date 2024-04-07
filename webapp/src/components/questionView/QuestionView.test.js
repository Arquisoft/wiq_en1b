import { render , screen, waitFor } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import QuestionView from './QuestionView';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import {queryHelpers, buildQueries} from '@testing-library/react';
import { UserContextProvider} from '../loginAndRegistration/UserContext';
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
    it('shows a question',async () => {
       
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
    /*
    it('renders a question',async () => {
        act(() => {
            const { getByText } = render(<MemoryRouter><QuestionView /></MemoryRouter>);
        });
        //h2 con la pregunta
        const tituloH2 = screen.getByRole('heading', { level: 2 });
        // Verifica si el elemento h2 está presente en el documento
        expect(tituloH2).toBeInTheDocument();
    });*/
    /*
    it('render a question and 4 buttons for answers', () => {
        act(() => {
            render(<MemoryRouter><QuestionView /></MemoryRouter>);
        });
        // Busca todos los botones por su rol
        const botones = screen.getAllByRole('button');

        // Verifica si hay exactamente 4 botones
        expect(botones.length).toBe(4);
    });
    it('shows colors to reveal correct answer', () => {
        act(() => {
            render(<MemoryRouter><QuestionView /></MemoryRouter>);
            fireEvent.click(queryHelpers.queryByAttribute('data-value', 'true'));//clicamos en la respuesta correcta
        });
        
        // Clic en un botón de respuesta con data-value=true
        const correctAnswerButton = queryHelpers.queryByAttribute('data-value', 'true');
        // Verificar que el botón tenga el color esperado
        expect(correctAnswerButton).toHaveStyle('background-color: #6EF26E');
    });
    it('shows colors to reveal false answer', () => {
        act(() => {
            render(<MemoryRouter><QuestionView /></MemoryRouter>);
            const falseAnswerButtons = (dataValue)=> queryHelpers.queryAllByAttribute('data-value', dataValue)('false');
            fireEvent.click(falseAnswerButtons.get(0));
        });
        

        // Obtener el botón de respuesta falso por su atributo data-value
        const falseAnswerButton = queryHelpers.queryAllByAttribute('data-value', 'false').get(0);

        // Verificar que el botón tenga el color esperado
        expect(falseAnswerButton).toHaveStyle('background-color:#FF6666');
    
    });*/
});