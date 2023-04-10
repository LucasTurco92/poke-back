import express from 'express'
import {router} from './api/poke-router.js';
import bodyParser from 'body-parser';
const app = express();
import cors from 'cors';
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