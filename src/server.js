const express = require('express')
const router = require('./api/poke-router.js');
var bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
const port = 5000;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/pokemon', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})