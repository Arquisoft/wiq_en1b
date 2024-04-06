import { render, screen ,fireEvent } from '@testing-library/react';
import { initReactI18next } from 'react-i18next';
import i18en from 'i18next';
import QuestionView from './QuestionView';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import {queryHelpers, buildQueries} from '@testing-library/react'

jest.mock('./QuestionGenerator', () => require('./mocks/QuestionGenerator'));

i18en.use(initReactI18next).init({
    resources: {},
    lng: 'en',
    interpolation:{
        escapeValue: false,
    }
});
global.i18en = i18en;

describe('Question View component', () => {
    it('renders a question',async () => {
        act(() => {
            render(<MemoryRouter><QuestionView /></MemoryRouter>);
            
        });
        const text = screen.getByText('Please Wait a bit...');
            expect(text).toBeInTheDocument();
        
        // Wait for questions to load
        await waitFor(() => expect(getByText('Mocked Question 1')).toBeInTheDocument());
        const tituloH2 = screen.getByRole('heading', { level: 2 });
        expect(tituloH2).toBeInTheDocument();
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