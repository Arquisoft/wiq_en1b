const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

let newUser = {
  email: 'example@example.com',
  username: 'testuser',
  password: 'testpassword',
  repeatPassword: 'testpassword'
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
    email: 'example@example.com',
    username: 'testuser',
    password: 'testpassword',
    repeatPassword: 'testpassword'
  };
})

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should show missing field email /adduser', async () => {
    const response = await request(app).post('/adduser').send();
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  });

  it('Should not register user /adduser', async () => {
  newUser.email = 'example2@example.com';

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

describe('User service validations', () => {
  it('shows error message on wrong formed email', async () => {
    newUser.email = "test"
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Wrong email format (example@example.com)');
  });

  it('shows error message on not equal passwords', async () => {
    newUser.repeatPassword = newUser.repeatPassword + "n";
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Passwords dont match');
  });

  it('shows error message on password have spaces', async () => {
    setPassword("1234 56789")
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Password cannot have spaces');
  });

  it('shows error message on password length is less than 8', async () => {
    setPassword("12")
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Password must be at least 8 characters long');
  });

  it('shows error message on password length is more than 64', async () => {
    setPassword("01234567890123456789012345678901234567890123456789012345678901234")
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Password must less than 64 characters long');
  });

  it('shows error message on username has spaces', async () => {
    newUser.username = newUser.username + " yes"
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Username cannot have spaces');
  });
});

function setPassword(newPassword){
  newUser.password = newPassword;
  newUser.repeatPassword = newPassword;
}