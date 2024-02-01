require('dotenv').config()
const express = require('express');
const app = express();
const port = 8000;

// Sample data (replace with your data)
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to get a list of items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
