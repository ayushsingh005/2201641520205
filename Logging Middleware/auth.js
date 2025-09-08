const axios = require('axios');
require('dotenv').config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function getAuthToken() {
  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/auth',
      {
        clientID: clientID,
        clientSecret: clientSecret
      }
    );
    console.log('Auth Token:', response.data.token);
  } catch (error) {
    console.error('Error fetching token:', error.message);
  }
}

getAuthToken();
