const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const recordServiceUrl = process.env.RECORD_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/questions', async (req, res) => {
  try {
    
    // Forward the question request to the quetion service
    const questionResponse = await axios.get(questionServiceUrl+'/questions');
    res.json(questionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/questions/:lang/:amount/:type', async (req, res) => {
  try {
    const lang = req.params.lang;
    const amount = req.params.amount;
    const type = req.params.type;
    // Forward the question request to the quetion service
    const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang + '/' + amount + '/' + type);

    res.json(questionResponse.data);
  } catch (error) {

    res.status(error.response.status).json({ error: error.response.data.error });
  }
});


app.get('/questions/:lang/:amount', async (req, res) => {
  try {
    const lang = req.params.lang;
    const amount = req.params.amount;
    // Forward the question request to the quetion service
    const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang + '/' + amount);

    res.json(questionResponse.data);
  } catch (error) {

    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.get('/questions/:lang', async (req, res) => {
  try {
    const lang = req.params.lang;
    // Forward the question request to the quetion service
    const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang);

    res.json(questionResponse.data);
  } catch (error) {

    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/record', async(req, res) => {
  try {
    // Forward the record request to the record service
    const recordResponse = await axios.post(recordServiceUrl+'/record', req.body);
    res.json(recordResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.get('/record/ranking/top10', async(req, res)=>{
  try {
    // Forward the record request to the record service
    const recordResponse = await axios.get(recordServiceUrl + '/record/ranking/top10');
    res.json(recordResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.get('/record/ranking/:user', async(req, res)=>{
  try {
    const user = req.params.user;
    // Forward the record request to the record service
    const recordResponse = await axios.get(recordServiceUrl + '/record/ranking/' + user);
    res.json(recordResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.get('/record/:user', async(req, res)=>{
  try {
    const user = req.params.user;
    // Forward the record request to the record service
    const recordResponse = await axios.get(recordServiceUrl + '/record/' + user);
    res.json(recordResponse.data);
  } catch (error) {
    res.send(error);
  }
});

// Read the OpenAPI YAML file synchronously
const file = fs.readFileSync('./openapi.yaml', 'utf8');

// Parse the YAML content into a JavaScript object representing the Swagger document
const swaggerDocument = YAML.parse(file);

// Serve the Swagger UI documentation at the '/api-doc' endpoint
// This middleware serves the Swagger UI files and sets up the Swagger UI page
// It takes the parsed Swagger document as input
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
