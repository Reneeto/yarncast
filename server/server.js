const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})