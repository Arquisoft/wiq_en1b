const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoserver;
let recordservice;
let questionservice;
let userservice;
let authservice;
let gatewayservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();

    //Populate db
    await loadQuestions();

    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    process.env.MONGODB_URI_QUESTIONS = mongoUri;
    questionservice = await require("../../questionservice/question-service")
    recordservice = await require("../../users/recordservice/record-service");
    userservice = await require("../../users/userservice/user-service");
    authservice = await require("../../users/authservice/auth-service");
    gatewayservice = await require("../../gatewayservice/gateway-service");
  }


async function loadQuestions() {
  const Question = require('../../questionservice/question-model');

  const questions =[{
    "question": "What's the capital of Mexico?",
    "answers": [
      "Mexico City",
      "Singapore",
      "Tokyo",
      "Sofia"
    ],
    "language": "en",
    "type": "CAPITAL"
  },
  {
    "question": "What's the capital of São Paulo?",
    "answers": [
      "São Paulo",
      "Nuuk",
      "Astana",
      "Chișinău"
    ],
    "language": "en",
    "type": "CAPITAL"
  },
  {
    "question": "What's the capital of Quebec?",
    "answers": [
      "Quebec City",
      "Budapest",
      "Vaduz",
      "Tallinn"
    ],
    "language": "en",
    "type": "CAPITAL"
  },
  {
    "question": "What's the official language of Paris?",
    "answers": [
      "French",
      "English",
      "Spanish",
      "Kazakh"
    ],
    "language": "en",
    "type": "LANGUAGE"
  },
  {
    "question": "What's the official language of Japan?",
    "answers": [
      "Japanese",
      "Brazilian Sign Language",
      "English",
      "French"
    ],
    "language": "en",
    "type": "LANGUAGE"
  },
  {
    "question": "What's the official language of Cairo?",
    "answers": [
      "Arabic",
      "Serbian",
      "Slovak",
      "French"
    ],
    "language": "en",
    "type": "LANGUAGE"
  },
  {
    "question": "What's the population of Greenland?",
    "answers": [
      "56421",
      "33288",
      "75604",
      "28774"
    ],
    "language": "en",
    "type": "POPULATION"
  },
  {
    "question": "What's the population of São Paulo?",
    "answers": [
      "11451245",
      "10077095",
      "15688205",
      "8588433"
    ],
    "language": "en",
    "type": "POPULATION"
  },
  {
    "question": "What's the population of Zürich?",
    "answers": [
      "427721",
      "598809",
      "329345",
      "543205"
    ],
    "language": "en",
    "type": "POPULATION"
  },
  {
    "question": "What's the size of Washington, D.C.?",
    "answers": [
      "177",
      "178",
      "127",
      "92"
    ],
    "language": "en",
    "type": "SIZE"
  },
  {
    "question": "What's the size of Republic of Ireland?",
    "answers": [
      "69797",
      "58629",
      "84454",
      "46066"
    ],
    "language": "en",
    "type": "SIZE"
  },
  {
    "question": "What's the size of Toronto?",
    "answers": [
      "630.21",
      "749.94995",
      "743.6478",
      "642.8142"
    ],
    "language": "en",
    "type": "SIZE"
  },
  {
    "question": "¿Cuál es la capital de Islandia?",
    "answers": [
      "Reikiavik",
      "Sarajevo",
      "Yakarta",
      "Bucarest"
    ],
    "language": "es",
    "type": "CAPITAL"
  },
  {
    "question": "¿Cuál es la capital de Región de Bruselas-Capital?",
    "answers": [
      "Ciudad de Bruselas",
      "Montevideo",
      "Nairobi",
      "Canegrate"
    ],
    "language": "es",
    "type": "CAPITAL"
  },
  {
    "question": "¿Cuál es la capital de Suecia?",
    "answers": [
      "Estocolmo",
      "Bakú",
      "Vilna",
      "Tirana"
    ],
    "language": "es",
    "type": "CAPITAL"
  },
  {
    "question": "¿Cuál es el idioma oficial de Irlanda del Norte?",
    "answers": [
      "inglés",
      "alemán",
      "japonés",
      "maltés"
    ],
    "language": "es",
    "type": "LANGUAGE"
  },
  {
    "question": "¿Cuál es el idioma oficial de Australia?",
    "answers": [
      "inglés australiano",
      "portugués",
      "sueco",
      "árabe"
    ],
    "language": "es",
    "type": "LANGUAGE"
  },
  {
    "question": "¿Cuál es el idioma oficial de Bulgaria?",
    "answers": [
      "búlgaro",
      "francés",
      "moldavo",
      "inglés"
    ],
    "language": "es",
    "type": "LANGUAGE"
  },
  {
    "question": "¿Cuál es la población de Grecia?",
    "answers": [
      "10566531",
      "7079575",
      "9721208",
      "14264816"
    ],
    "language": "es",
    "type": "POPULATION"
  },
  {
    "question": "¿Cuál es la población de Kenia?",
    "answers": [
      "47564296",
      "13176196",
      "2236408",
      "12700553"
    ],
    "language": "es",
    "type": "POPULATION"
  },
  {
    "question": "¿Cuál es la población de Rumania?",
    "answers": [
      "19053815",
      "11241750",
      "13147132",
      "20197043"
    ],
    "language": "es",
    "type": "POPULATION"
  },
  {
    "question": "¿Cuál es el área (km cuadrados) de Letonia?",
    "answers": [
      "64593.79",
      "51029.094",
      "46507.53",
      "49737.22"
    ],
    "language": "es",
    "type": "SIZE"
  },
  {
    "question": "¿Cuál es el área (km cuadrados) de Estados Unidos?",
    "answers": [
      "9826675",
      "5896005",
      "10318008",
      "10514542"
    ],
    "language": "es",
    "type": "SIZE"
  },
  {
    "question": "¿Cuál es el área (km cuadrados) de México?",
    "answers": [
      "1972550",
      "2426236",
      "2189530",
      "1617491"
    ],
    "language": "es",
    "type": "SIZE"
  }]

  //No need of loading questions for these tests
  //await Question.bulkSave(questions);
}

startServer();
