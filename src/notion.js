const { Client } = require('@notionhq/client');

// Initializing the Notion client with the API token from .env file
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function getDatabase() {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    return response.results;
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    throw error;
  }
}

module.exports = { getDatabase };
