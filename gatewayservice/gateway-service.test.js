const request = require('supertest');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = require('./gateway-service'); 

afterAll(async () => {
    app.close();
  });


jest.mock('jsonwebtoken');

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

  axios.get.mockImplementation((url, data) => {
    if (url.endsWith('/questions')){
      return Promise.resolve({ data:  [{question: "¿Cuál es la población de Oviedo?",
                                      answers: ["225089","272357","267855","231841"]}] });
    } else if (url.endsWith('/questions/es')){
      return Promise.resolve({ data:  [{question: "¿Cuál es la población de Oviedo?",
                                      answers: ["225089","272357","267855","231841"]}] });
    } else if(url.endsWith('/record/testuser')){
      //Dont need to check a good record just that it redirects the call
      return Promise.resolve({data : {record:'undefined'}}) 
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

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
  });
  
  // Test /questions/:lang endpoint
  it('should forward questions request to question service', async () => {
    const response = await request(app)
      .get('/questions/es').set('token', 'valorDelToken');

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('question', "¿Cuál es la población de Oviedo?");
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
    console.log(response)
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('record', "undefined");
  });
});