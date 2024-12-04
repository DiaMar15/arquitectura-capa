const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to render the index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

//Add api routes
const apiLibros = require('./routes/api')
app.use('/libreria', apiLibros)