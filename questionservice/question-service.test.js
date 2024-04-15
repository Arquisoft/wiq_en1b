const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Question = require('./question-model');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI_QUESTIONS = mongoUri;
  app = require('./question-service'); 

  //Populate db
  for(let i = 0; i < 21 ; i++){
    const question = new Question( {
        question: "¿Cuál es la población de Oviedo?",
        answers: [
            "225089",
            "272357",
            "267855",
            "231841"
        ],
        language: "es",
        type: "POPULATION"
      })
    
    await question.save();
  }
  


});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Question Service', () => {
  it('Should give 5 questions /questions/es', async () => {

    let response = await request(app).get('/questions/es');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
    expect(Object.keys(response.body).length).toBe(5);
  });

  it('Should give no question /questions/en', async () => {

    let response = await request(app).get('/questions/en');
    expect(response.status).toBe(200);
    expect(response).toHaveProperty('body', ); //There are no questions
  });

  it('Should give 5 question /questions', async () => {

    let response = await request(app).get('/questions');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
    expect(Object.keys(response.body).length).toBe(5);
  });

  it('Should give 10 questions /questions/es/10', async () => {

    let response = await request(app).get('/questions/es/10');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
    expect(Object.keys(response.body).length).toBe(10);
  });

  it('Should give 20 questions as the max is 20 /questions/es/21', async () => {

    let response = await request(app).get('/questions/es/21');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
    expect(Object.keys(response.body).length).toBe(20);
  });

  it('Should give 10 questions /questions/es/10/POPULATION', async () => {

    let response = await request(app).get('/questions/es/10/POPULATION');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
    expect(Object.keys(response.body).length).toBe(10);
  });

  it('Should give 0 questions /questions/es/10/CAPITAL', async () => {

    let response = await request(app).get('/questions/es/10/CAPITAL');
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBe(0);
  });
});