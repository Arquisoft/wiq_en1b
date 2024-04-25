const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');
//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs")
const YAML = require('yaml')
const jwt = require('jsonwebtoken');
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
    manageError(res, error)
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    manageError(res, error);
    
  }
});

app.get('/questions', async (req, res) => {
  try {
    
    // Forward the question request to the quetion service
    const questionResponse = await axios.get(questionServiceUrl+'/questions');
    res.json(questionResponse.data);
  } catch (error) {
    manageError(res, error)
  }
});



app.get('/questions/:lang/:amount/:type', verifyToken, async (req, res) => {
  try {
    if(!validateLang(req.params.lang.toString()) ||
       !validateAmount(req.params.amount.toString()) ||
       !validateType(req.params.type.toString()))
       res.status(400).json({ error: 'Wrong values given' });
    else {
      const lang = encodeURIComponent(req.params.lang.toString());
      const amount = encodeURIComponent(req.params.amount.toString());
      const type = encodeURIComponent(req.params.type.toString());
      // Forward the question request to the quetion service
      const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang + '/' + amount + '/' + type);

      res.json(questionResponse.data);
    }
  } catch (error) {

    manageError(res, error)
  }
});


app.get('/questions/:lang/:amount', verifyToken, async (req, res) => {
  try {
    if(!validateLang(req.params.lang.toString()) ||
       !validateAmount(req.params.amount.toString()))
        res.status(400).json({ error: 'Wrong values given' });
    else{
      const lang = encodeURIComponent(req.params.lang.toString());
      const amount = encodeURIComponent(req.params.amount.toString());
      // Forward the question request to the quetion service
      const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang + '/' + amount);
  
      res.json(questionResponse.data);
    }
  } catch (error) {
    manageError(res, error)
  }
});

app.get('/questions/:lang', async (req, res) => {
  try {
    if(!validateLang(req.params.lang.toString()))
      res.status(400).json({ error: 'Wrong values given' });
    else{
      const lang = encodeURIComponent(req.params.lang.toString());
      // Forward the question request to the quetion service
      const questionResponse = await axios.get(questionServiceUrl+'/questions/' + lang.toString());

      res.json(questionResponse.data);
    }
    
  } catch (error) {

    manageError(res, error)
  }
});

app.post('/record', verifyToken, async(req, res) => {

  try {
    // Forward the record request to the record service
    const recordResponse = await axios.post(recordServiceUrl+'/record', req.body);
    res.json(recordResponse.data);
  } catch (error) {
    manageError(res, error)
  }
});

app.get('/record/ranking/top10', verifyToken, async(req, res)=>{
  try {
    // Forward the record request to the record service
    const recordResponse = await axios.get(recordServiceUrl + '/record/ranking/top10');
    res.json(recordResponse.data);
  } catch (error) {
    manageError(res, error)
  }
});

app.get('/record/ranking/:user', verifyToken, async(req, res)=>{
  try {
    if(!validateUser(req.params.user.toString()))
        res.status(400).json({ error: 'Wrong values given' });
    else{
      const user = encodeURIComponent(req.params.user.toString());
      // Forward the record request to the record service
      const recordResponse = await axios.get(recordServiceUrl + '/record/ranking/' + user);
      res.json(recordResponse.data);
    }
  } catch (error) {
    manageError(res, error)
  }
});

app.get('/record/:user', verifyToken,  async(req, res)=>{
  try {
    if(!validateUser(req.params.user.toString()))
      res.status(400).json({ error: 'Wrong values given' });
    else{
      const user = encodeURIComponent(req.params.user.toString());
      // Forward the record request to the record service
      const recordResponse = await axios.get(recordServiceUrl + '/record/' + user);
      res.json(recordResponse.data);
    }
  } catch (error) {
    manageError(res, error)
  }
});

// Read the OpenAPI YAML file synchronously
const openapiPath = './openapi.yaml'
if(fs.existsSync(openapiPath)){
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}


// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers['token'] || req.body.token || req.query.token;

  // Verify if the token is valid
  jwt.verify(token, (process.env.JWT_KEY??'my-key'), (err, decoded) => {
    if (err) {
      // Token is not valid
      res.status(403).json({authorized: false,
        error: 'Invalid token or outdated'});
    } else {
      // Token is valid
      req.decodedToken = decoded;
      // Call next() to proceed to the next middleware or route handler
      next();
    }
  });
}

function validateLang(lang){
  return ['en', 'es', 'tr'].includes(lang);
}

function validateAmount(amount) {
  const parsed = parseInt(amount, 10);
  // We only accept integers and positive ones
  return !isNaN(parsed) && parsed > 0;
}

function validateType(type){
  return ['POPULATION', 'CAPITAL', 'LANGUAGE', 'SIZE'].includes(type);
}

function validateUser(user){
  return !(/\s/.test(user)) //True if there are no spaces
}

function manageError(res, error){
  if(error.response) //Some microservice responded with an error
    res.status(error.response.status).json({ error: error.response.data.error });
  else //Some other error
    res.status(500).json({error : "Interanl server error"})
}

module.exports = server
