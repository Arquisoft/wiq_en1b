const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./record-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Record Service', () => {
  it('should add a new record on POST /record', async () => {
    const newUser = {
        user:"testuser",
        game:
        {
            "questions": [
            {
            "question": "¿Cuál es el río más largo del mundo?",
            "answers": ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
            "answerGiven": "Amazonas",
            "correctAnswer": "Amazonas"
            },
            {
            "question": "¿Cuál es el elemento más abundante en la corteza terrestre?",
            "answers": ["Hierro", "Oxígeno", "Silicio", "Aluminio"],
            "answerGiven": "Oxígeno",
            "correctAnswer": "Oxígeno"
            }
            ],
            "points": 2500,
            "date": "02/02/24"
        }
    };

    const response = await request(app).post('/record').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user', 'testuser');
  });

  it('should get back on GET /record/testuser', async () => {
    const responseGet = await request(app).get('/record/testuser');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.record.games[0]).toHaveProperty('date', '02/02/24');
  });

  it('should get undefined on GET /record/u', async () => {
    const responseGet = await request(app).get('/record/u');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toHaveProperty('record', 'undefined');
  });

  it('should add a new record with the same user on POST /record, and get it back on GET /record/testuser with both games', async () => {
    const testUser = {
        user:"testuser",
        game:
        {
            "questions": [
              {
                "question": "¿Cuál es la capital de Francia?",
                "answers": ["Londres", "Madrid", "Berlín", "París"],
                "answerGiven": "París",
                "correctAnswer": "París"
              },
              {
                "question": "¿Quién escribió 'Cien años de soledad'?",
                "answers": ["Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar", "Pablo Neruda"],
                "answerGiven": "Gabriel García Márquez",
                "correctAnswer": "Gabriel García Márquez"
              }
            ],
            "points": 3000,
            "date": "03/03/24"
          }          
    };

    let responseAdd = await request(app).post('/record').send(testUser);
    expect(responseAdd.status).toBe(200);

    const responseGet = await request(app).get('/record/testuser');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.record.games[0]).toHaveProperty('date', '02/02/24');
    expect(responseGet.body.record.games[1]).toHaveProperty('date', '03/03/24');

  });
});