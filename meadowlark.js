const express = require('express');
const expressHandlebars = require('express-handlebars');
const logger = require('morgan');
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

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));

app.use(weatherMiddlware);

app.get('/', handlers.home);
app.get('/about', handlers.about);

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
