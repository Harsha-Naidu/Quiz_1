const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
const logger = require('morgan');
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(logger('dev')); 



const clucksRouter = require('./routes/clucks');
app.use('/', clucksRouter);

const knex = require('./db/client');

const ADDRESS = 'localhost'; 
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});