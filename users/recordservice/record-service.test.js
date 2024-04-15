const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Record = require('./record-model')

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./record-service'); 

  await populateDatabase();
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Record Service', () => {
  it('should give a 400 with a bad requests on POST /record', async () => {
    //Does not have neither user nor game
    let newUser = {
      bad:"testuser",
      bad2:
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

    let response = await request(app).post('/record').send(newUser);
    expect(response.status).toBe(400);

    //Does not have game
    newUser = {
      user:"testuser",
      bad:
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

    response = await request(app).post('/record').send(newUser);
    expect(response.status).toBe(400);

    //Does not have user
    newUser = {
      bad:"testuser",
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

    response = await request(app).post('/record').send(newUser);
    expect(response.status).toBe(400);

    //Data lacks competitive field
    newUser = {
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

    response = await request(app).post('/record').send(newUser);
    expect(response.status).toBe(500);

  });
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
            "date": "02/02/24",
            "competitive": false
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
            "date": "03/03/24",
            "competitive": false
          }          
    };

    let responseAdd = await request(app).post('/record').send(testUser);
    expect(responseAdd.status).toBe(200);

    const responseGet = await request(app).get('/record/testuser');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.record.games[0]).toHaveProperty('date', '02/02/24');
    expect(responseGet.body.record.games[1]).toHaveProperty('date', '03/03/24');

  });

  it('should get back on GET /record/testuser', async () => {
    const responseGet = await request(app).get('/record/testuser');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.record.games[0]).toHaveProperty('date', '02/02/24');
  });

  it('should get back on GET /record/testuser', async () => {
    const responseGet = await request(app).get('/record/testuser');
    expect(responseGet.status).toBe(200);
    expect(responseGet.body.record.games[0]).toHaveProperty('date', '02/02/24');
  });

  it('should get back on GET /record/ranking/top10', async () => {
    const responseGet = await request(app).get('/record/ranking/top10');
    expect(responseGet.status).toBe(200);
    const usersStats = responseGet.body.usersCompetitiveStats;
    expect(usersStats.length).toBe(10); //Only top 10

    //Ordered by points
    expect(usersStats[0]).toHaveProperty('_id', 'user10');
    expect(usersStats[9]).toHaveProperty('_id', 'user1');

    expect(usersStats[0]).toHaveProperty('totalCompetitiveGames', 2);
    expect(usersStats[0]).toHaveProperty('totalPoints', 200);
  });

  it('should get back on GET /record/ranking/user1', async () => {
    const responseGet = await request(app).get('/record/ranking/user1');
    expect(responseGet.status).toBe(200);
    const userStats = responseGet.body.userCompetitiveStats;

    expect(userStats).toHaveProperty('_id', 'user1');
    expect(userStats).toHaveProperty('totalCompetitiveGames', 2);
    expect(userStats).toHaveProperty('totalPoints', 20); //i * 10 * totalCompetitiveGames , i = 2
  });
});



async function populateDatabase() {
  try {
      // Generate 10 users
      for (let i = 1; i <= 10; i++) {
          const user = `user${i}`;
          const games = [];
          
          // Generate 3 games for each user
          for (let j = 1; j <= 3; j++) {
              const game = {
                  questions: [
                      {
                          question: `Question ${j} for ${user}`,
                          answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                          answerGiven: "Answer 1",
                          correctAnswer: "Answer 1"
                      }
                  ],
                  points: i * 10,
                  date: "04/01/2024", 
                  competitive: j <= 2 ? true : false // Only 2 games are competitive
              };
              games.push(game);
          }
          
          // Guardar el usuario en la base de datos
          await Record.create({ user, games });
      }
      
      console.log('Database populated successfully');
  } catch (error) {
      console.error('Error populating database:', error);
  }
}