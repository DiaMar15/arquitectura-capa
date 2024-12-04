const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 1507;

app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Add api routes
const apiLibros = require('./routes/api')
app.use('/libreria', apiLibros)