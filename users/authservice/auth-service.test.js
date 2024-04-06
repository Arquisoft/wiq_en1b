const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./auth-model');

let mongoServer;
let app;

//test user
const user = {
  username: 'testuser',
  password: 'testpassword',
};

async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
    createdAt: new Date()
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./auth-service'); 
  //Load database with initial conditions
  await addUser(user);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should show missing field user /login', async () => {
    const response = await request(app).post('/login').send();
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: username');
  });

  it('Should show invalid credentials /login', async () => {
    const user2 = {username:"Hello", password:"world"}
    const response = await request(app).post('/login').send(user2);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
});
