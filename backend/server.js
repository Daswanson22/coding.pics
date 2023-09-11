// server.js

require('dotenv').config();

const express = require('express');
const axios = require('axios'); // You might need Axios to make API requests to Pixabay
const cors = require('cors'); // Import the cors module


const app = express();
const PORT = process.env.PORT || 3000;

// const allowedOrigins = ['http://example1.com', 'http://example2.com'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

app.use(cors());
// Define a route to handle the Pixabay API request
app.get('/pixabay', async (req, res) => {
  try {
    const apiKey = process.env.PIXABAY_API_KEY; // Use the environment variable to access the API key
    const searchTerm = req.query.search; // Get the search term from the frontend (you need to send it from the frontend)

    // Make a request to Pixabay API using your API key
    const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}`);
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Pixabay API:', error.message);
    res.status(500).json({ error: 'Error fetching data from Pixabay API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
