require('dotenv').config(); // This should be at the top of your server.js
const express = require('express');
const { getDatabase } = require('./src/notion');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/data', async (req, res) => {
  try {
    const data = await getDatabase();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/data route:', error);
    res.status(500).json({ error: 'Failed to fetch data from Notion' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
