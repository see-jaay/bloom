require('dotenv').config()
console.log(process.env);

const express = require('express');
const cors = require('cors');
const app = express();

const fsRoute = require('./routes/fsRoute');
// const userAdminRoute = require('/routes/userAdminRoute');

const port = 3001;

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use('fs', fsRoute);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(status).json({message: err.message});
  return;
});

app.listen(port, () => console.log(`bloom services hosting at http://localhost:${port}`));