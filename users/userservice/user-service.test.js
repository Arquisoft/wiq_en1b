const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

let newUser = {
  email: 'Nice@g.com',
  username: 'testuser',
  password: 'testpassword'
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

afterEach(async () => {
  newUser = {
    email: 'Nice@g.com',
    username: 'testuser',
    password: 'testpassword'
  };
})

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should show missing field user /adduser', async () => {
    const response = await request(app).post('/adduser').send();
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  });

  it('Should not register user /adduser', async () => {
  newUser.email = 'Nice2@g.com';

  const response = await request(app).post('/adduser').send(newUser);
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('error', 'Username already in use');
  });

  it('Should not register user /adduser', async () => {
    newUser.username = 'testuser2';
  
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Email already in use');
    });
  
});
