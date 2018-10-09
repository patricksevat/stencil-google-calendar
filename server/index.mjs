import express from 'express';
import bodyParser from 'body-parser';
import { generateToken } from './generateToken';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getToken', (req, res) => {
  const { serviceAccountEmail } = req.query;
  if (!serviceAccountEmail) {
    res.json({
      status: 'ERROR',
      message: 'Invalid serviceAccountEmail query parameter'
    })
  }

  res.header('X-Content-Type-Options', 'nosniff');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({
    status: 'OK',
    data: generateToken(serviceAccountEmail),
  })
});

app.get('*', (req, res) => res.json({
  status: 'OK',
  data: 'PONG',
}));

app.listen(3000, () => console.log('jwt service listening on 3000'));