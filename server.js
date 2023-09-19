const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' directory where your Angular app is built
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the Angular app for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
