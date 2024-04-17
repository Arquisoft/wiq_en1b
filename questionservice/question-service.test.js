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
  for(let i = 0; i < 6 ; i++){
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
});