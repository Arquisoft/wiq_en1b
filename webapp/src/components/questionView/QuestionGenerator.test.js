import QuestionGenerator from './QuestionGenerator';
import axios from 'axios';
import Question from './Question';

jest.mock('axios'); // Mockear axios para pruebas

describe('QuestionGenerator', () => {
  let questionGenerator;

  beforeEach(() => {
    questionGenerator = new QuestionGenerator(); // Crear una nueva instancia antes de cada prueba
  });

  it('should generate questions with type "ALL"', async () => {
    const token = 'mockedToken';
    const lang = 'en';
    const amount = 10;

    // Simular respuesta exitosa de la API
    axios.get.mockResolvedValue({
      data: [{question: "What is the population of Oviedo?",
      answers: ["225089","272357","267855","231841"]}],
    });

    const questions = await questionGenerator.generateQuestions(lang, 'ALL', amount, token);

    // Verificar que axios.get fue llamado con la URL correcta
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/\/questions\/en\/10$/),
      { headers: { 'token': 'mockedToken' } }
    );

    // Verificar que se generaron las preguntas correctas
    expect(questions.length).toBe(1);
    expect(questions[0]).toBeInstanceOf(Question);
    expect(questions[0].question).toBe("What is the population of Oviedo?");
  });

  it('should handle errors gracefully', async () => {
    const token = 'mockedToken';
    const lang = 'en';
    const amount = 10;

    // Simular una respuesta con error
    axios.get.mockRejectedValue(new Error('API request failed'));

    await expect(questionGenerator.generateQuestions(lang, 'ALL', amount, token)).rejects.toThrow('API request failed'); // Verificar que se lanza un error
  });

  it('should generate competitive questions', async () => {
    const token = 'mockedToken';
    const lang = 'en';

    axios.get.mockResolvedValue({
      data: [{question: "What is the population of Oviedo?",
      answers: ["225089","272357","267855","231841"]}],
    });

    const questions = await questionGenerator.generateQuestions(lang, 'COMPETITIVE', 0, token);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/\/questions\/en$/),
      { headers: { 'token': 'mockedToken' } }
    );

    expect(questions.length).toBe(1);
    expect(questions[0].question).toBe("What is the population of Oviedo?");
  });

  it('should have the base url', () => {
    expect(questionGenerator.apiUrl).toEqual('http://localhost:8000/questions')
  })

  it('should not have the base url', () => {
    process.env.REACT_APP_API_ENDPOINT = 'test';
    questionGenerator = new QuestionGenerator();
    expect(questionGenerator.apiUrl).toEqual('test/questions')
  })
});
