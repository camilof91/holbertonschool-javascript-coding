const express = require('express');
const app = express();
const port = 1245;

const routes = require('./routes');

app.use(express.json()); // Parse JSON data in requests (optional)
app.use('/', routes); // Use the routes defined in ./routes

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app; // Export the app for testing purposes