/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const logger = require('morgan');
const multiparty = require('multiparty');
const path = require('path');
const debug = require('debug')('meadowlark');
const handlers = require('./lib/handlers');
const weatherMiddlware = require('./lib/middleware/weather');

const app = express();
const port = process.env.PORT || 3e3;

app.set('view engine', 'hbs');
app.engine('hbs', expressHandlebars({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    section(name, options) {
      if (!this._sections) {
        this._sections = {};
      }
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/public`));
app.use('/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/assets/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/assets/css', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/css')));
app.use('/assets/webfonts', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')));
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/js')));
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use(logger('dev'));
app.use(weatherMiddlware);

app.get('/', handlers.home);
app.get('/about', handlers.about);

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

app.get('/contest/vacation-photo', handlers.vacationPhotoContest);
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax);
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return handlers.vacationPhotoContestProcessError(req, res, err.message);
    console.log('got fields: ', fields);
    console.log('and files: ', files);
    return handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou);
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return handlers.api.vacationPhotoContestError(req, res, err.message);
    return handlers.api.vacationPhotoContest(req, res, fields, files);
  });
});

app.use(handlers.notFound);
app.use(handlers.serverError);

if (require.main === module) {
  app.server = app.listen(port, () => {
    debug(`Start: ${new Date()}`);
    debug(`Listening on port: ${port}`);
  });
} else {
  module.exports = app;
}
