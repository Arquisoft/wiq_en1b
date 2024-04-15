const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

afterAll(async () => {
    app.close();
  });

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken', username : 'testuser'} });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { username: 'newuser' } });
    } else if(url.endsWith('/record')){
      return Promise.resolve({data : {user:'testuser'}})
    } 
  });

  const question = { data:  [{question: "¿Cuál es la población de Oviedo?",
                              answers: ["225089","272357","267855","231841"]}] };

  //Dont need to check a good record just that it redirects the call
  const record = {data : {record:'undefined'}};

  axios.get.mockImplementation((url, data) => {
    if (url.endsWith('/questions')){
      return Promise.resolve(question);
    } else if (url.endsWith('/questions/es/1/CAPITAL')){
      return Promise.resolve(question);
    } else if (url.endsWith('/questions/es/1')){
      return Promise.resolve(question);
    } else if (url.endsWith('/questions/es')){
      return Promise.resolve(question);

    } else if(url.endsWith('/record/testuser')){
      return Promise.resolve(record) 
    } else if(url.endsWith('/record/ranking/top10')){
      return Promise.resolve(record)
    } else if(url.endsWith('/record/ranking/testuser')){
      return Promise.resolve(record)  
    }
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
    expect(response.body.username).toBe('testuser');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('newuser');
  });
  
  // Test /questions endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions');

      checkQuestion(response);
  });
  
  // Test /questions/:lang endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es');

    checkQuestion(response);
  });

  // Test /questions/:lang/:amount endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es/1');

      checkQuestion(response);
  });

  // Test /questions/:lang/:amount/:type endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es/1/CAPITAL');

      checkQuestion(response);
  });

  // Test /record endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .post('/record');

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('testuser');
  });

  // Test /record/:user endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/testuser');

      checkRecord(response);
  });

  // Test /record/ranking/:user endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/ranking/testuser');

      checkRecord(response);
  });

  // Test /record/ranking/top10 endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/ranking/top10');
      checkRecord(response);
    
  });
});

function checkRecord(response){
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('record', "undefined");
}

function checkQuestion(response){
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
}