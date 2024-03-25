const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

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
    const quetionResponse = await axios.get(questionServiceUrl+'/questions', req.params);
    res.send(quetionResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/addrecord', async(req, res) => {
  try {
    // Forward the record request to the record service
    const recordResponse = await axios.post(recordServiceUrl+'/addrecord', req.body);
    res.send(recordResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.get('/records/:user', async(req, res)=>{
  try {
    const user = req.params.user;
    // Forward the record request to the record service
    const recordResponse = await axios.get(recordServiceUrl + '/records/' + user);
    res.send(recordResponse.record);
  } catch (error) {
    res.send(error);
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
