const express = require('express');
const expressHandlebars = require('express-handlebars');
const logger = require('morgan');
const debug = require('debug')('meadowlark');

const app = express();
const port = process.env.PORT || 3e3;
const fortunes = [
  'Conquer your fears or they will conquer you.',
  'Rivers need springs.',
  'Do not fear what you don\'t know.',
  'You will have a pleasant surprise.',
  'Whenever possible, keep it simple.',
];

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500');
});

app.server = app.listen(port, () => {
  debug(`Start: ${new Date()}`);
  debug(`Listening on port: ${port}`);
});
