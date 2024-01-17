const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/api/authenticate', async (req, res) => {
  const { username } = req.body;
  try{
    const rest = await axios.put('https://api.chatengine.io/users/',
    {username: username, secret: username, firstName: username},
    {headers : { "private-key": process.env.CHAT_ENGINE_PRIVATE_KEY }}
    );
    return res.status(rest.status).json(rest.data);
  } catch (error) {
    if (error.isAxiosError)
      return res.status(error.response.status).json({message: error.response.data.message});
    return res.status(500).json({message: 'Internal Server Error'});
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));