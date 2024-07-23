require('dotenv').config();
const express = require('express');
const { getDatabase } = require('./notionClient');

const app = express();
const port = process.env.PORT || 3000;

app.get('/data', async (req, res) => {
  try {
    const databaseData = await getDatabase();
    console.log('Database data:', databaseData); // Agrega este console.log
    res.json(databaseData);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    res.status(500).send('Error fetching data from Notion');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
