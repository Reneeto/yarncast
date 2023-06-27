const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

app.use('/build', express.static(path.join(__dirname, '../build')));



app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})