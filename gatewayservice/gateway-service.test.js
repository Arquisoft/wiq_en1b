const request = require('supertest');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = require('./gateway-service'); 
const { cat } = require('asciidoctor-emoji/dist/node/twemoji-map');

afterAll(async () => {
    app.close();
  });


jest.mock('jsonwebtoken');

jest.mock('axios');



describe('Gateway Service with mocked micro services', () => {

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

  

  // Mock the `verify` function of JWT
  jwt.verify.mockImplementation((token, secretOrPublicKey, callback) => {
    // Assume the token is valid and return the payload
    callback(null, "decoded");
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
      .get('/questions').set('token', 'valorDelToken');

      checkQuestion(response);
  });
  
  // Test /questions/:lang endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es').set('token', 'valorDelToken');

    checkQuestion(response);
  });

  // Test /questions/:lang/:amount endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es/1').set('token', 'valorDelToken');

      checkQuestion(response);
  });

  // Test /questions/:lang/:amount/:type endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es/1/CAPITAL').set('token', 'valorDelToken');

      checkQuestion(response);
  });

  // Test /record endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .post('/record').set('token', 'valorDelToken');

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toBe('testuser');
  });

  // Test /record/:user endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/testuser').set('token', 'valorDelToken');

      checkRecord(response);
  });

  // Test /record/ranking/:user endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/ranking/testuser').set('token', 'valorDelToken');

      checkRecord(response);
  });

  // Test /record/ranking/top10 endpoint
  it('should forward record request to record service', async () => {
    const response = await request(app)
      .get('/record/ranking/top10').set('token', 'valorDelToken');
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

describe('Gateway Service without mocked micro services', () => {

    it('should not forward login request and give 500', async () => {
      try{
        await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' });

      } catch(error){
        expect(error.response.status).toBe(500);
        expect(error.response.data.error).toBe('Internal server error');
      }
    });

    axios.post.mockImplementation((url, data) => {
      if (url.endsWith('/login')) {
        throw new Error("Important information");
      } 
    });

    it('should not forward login request and give 500', async () => {
      axios.post.mockImplementation((url, data) => {
        if (url.endsWith('/login')) {
          throw new Error("Important information");
        } 
      });
      try{
        await request(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' });

      } catch(error){
        expect(error.response.status).toBe(500);
        expect(error.response.data.error).toBe('Internal server error');
      }
    });
});
