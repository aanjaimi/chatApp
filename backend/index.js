const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = ['https://chat-app-navy-xi.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.post('/api/authenticate', async (req, res) => {
  const { username } = req.body;
  try{
    if (!process.env.CHAT_ENGINE_PRIVATE_KEY) {
      console.error('Error: CHAT_ENGINE_PRIVATE_KEY is not defined in environment variables.');
      process.exit(1);
    }  
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));