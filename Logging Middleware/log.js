const axios = require('axios');
require('dotenv').config();

const authToken = process.env.AUTH_TOKEN;

async function sendLog(stack, level, pkg, message) {
  const logData = {
    stack: stack,
    level: level,
    package: pkg,
    message: message
  };

  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      logData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    console.log('Log sent:', response.data);
  } catch (error) {
    console.error('Error sending log:', error.message);
  }
}

module.exports = { sendLog };
