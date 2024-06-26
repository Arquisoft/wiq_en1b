const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const User = require('./user-model');

// Mock the `jsonwebtoken` module
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));
const expectedToken = "mockedToken"
jwt.sign.mockReturnValue(expectedToken);

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

describe('User Service /adduser', () => {
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

  it('Should not register user /adduser', async () => {

    var newUser4 = {
      email: 'example4@example.com',
      username: 'testuser4',
      password: 'testpassword',
      repeatPassword: 'testpassword'
    };

    var newUser4DB = new User(newUser4);
    await newUser4DB.save();


    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Username already in use');
  })
  
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


describe('User service /forgetPassword', () => {
  it('should return a token when given good credentials', async () => {
    const response = await request(app).post('/forgetPassword').send({email:newUser.email, username:newUser.username});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', expectedToken);
  })

  it('should show missing field email', async () => {
    const response = await request(app).post('/forgetPassword').send({username:newUser.username});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  })

  it('should show no user found', async () => {
    const response = await request(app).post('/forgetPassword').send({email: "add" + newUser.email, username:newUser.username});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'No user found, review credentials');
  })
})

describe('User service /changePassword', () => {
  it('should return a token when given good credentials', async () => {
    setPassword('123456789')
    const response = await request(app).post('/changePassword').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', expectedToken);
  })

  it('should show missing field email', async () => {
    const response = await request(app).post('/changePassword').send({username:newUser.username});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  })

  it('should show no user found', async () => {
    newUser.email = "add" + newUser.email;
    const response = await request(app).post('/changePassword').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'No user found, review credentials');
  })
})