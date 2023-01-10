const express = require('express')
const router = require('./api/poke-router.js');
var bodyParser = require('body-parser');
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})